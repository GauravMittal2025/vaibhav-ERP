import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/post-auth/ui/roles/Card';
import { Button } from '../../../components/post-auth/ui/roles/Button';
import { Role } from '../../../types/roles';
import { roles, createRole, updateRole } from '../../data/roles';
import { permissions, getPermissionsByCategory } from '../../data/permissions';
// import { useToast } from '../../../components/post-auth/ui/roles/Toaster';
import { addActivityLog } from '../../data/activity';
import { useAppContext } from '../../../context/AppContext';

export const RoleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const { toast } = useToast();
  const { user: users } = useAppContext();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    permissions: string[];
  }>({
    name: '',
    description: '',
    permissions: [],
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    permissions?: string;
  }>({});
  
  const [permissionsByCategory, setPermissionsByCategory] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get permissions grouped by category
    setPermissionsByCategory(getPermissionsByCategory());
    
    if (isEditMode) {
      const roleToEdit = roles.find(role => role.id === id);
      
      if (roleToEdit) {
        setFormData({
          name: roleToEdit.name,
          description: roleToEdit.description,
          permissions: [...roleToEdit.permissions],
        });
      } else {
        navigate('/roles');
        // toast({
        //   title: 'Role not found',
        //   type: 'error',
        // });
      }
    }
  }, [id, isEditMode, navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission must be selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handlePermissionChange = (permissionName: string) => {
    setFormData(prev => {
      const updatedPermissions = prev.permissions.includes(permissionName)
        ? prev.permissions.filter(p => p !== permissionName)
        : [...prev.permissions, permissionName];
      
      return {
        ...prev,
        permissions: updatedPermissions,
      };
    });
    
    // Clear permissions error if they select any
    if (errors.permissions) {
      setErrors(prev => ({
        ...prev,
        permissions: undefined,
      }));
    }
  };

  const handleCategorySelectAll = (category: string, categoryPermissions: any[]) => {
    const permissionNames = categoryPermissions.map(p => p.name);
    
    // Check if all permissions in this category are already selected
    const allSelected = permissionNames.every(name => formData.permissions.includes(name));
    
    setFormData(prev => {
      if (allSelected) {
        // Deselect all in category
        return {
          ...prev,
          permissions: prev.permissions.filter(p => !permissionNames.includes(p)),
        };
      } else {
        // Select all in category
        const newPermissions = [...prev.permissions];
        
        permissionNames.forEach(name => {
          if (!newPermissions.includes(name)) {
            newPermissions.push(name);
          }
        });
        
        return {
          ...prev,
          permissions: newPermissions,
        };
      }
    });
    
    // Clear permissions error
    if (errors.permissions) {
      setErrors(prev => ({
        ...prev,
        permissions: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditMode) {
        // Update existing role
        const updatedRole = updateRole(id!, formData);
        
        if (updatedRole) {
          // Log activity
          addActivityLog({
            userId: users?.id || '',
            userName: users?.name || '',
            action: 'updated',
            resource: 'role',
            resourceId: updatedRole.id,
          });
          
          // toast({
          //   title: 'Role updated',
          //   description: `${updatedRole.name} has been updated successfully.`,
          //   type: 'success',
          // });
          
          navigate(`/roles/${updatedRole.id}`);
        } else {
          throw new Error('Failed to update role');
        }
      } else {
        // Create new role
        const newRole = createRole(formData);
        
        // Log activity
        addActivityLog({
          userId: users?.id || '',
          userName: users?.name || '',
          action: 'created',
          resource: 'role',
          resourceId: newRole.id,
        });
        
        // toast({
        //   title: 'Role created',
        //   description: `${newRole.name} has been created successfully.`,
        //   type: 'success',
        // });
        
        navigate(`/roles/${newRole.id}`);
      }
    } catch (error) {
      // toast({
      //   title: isEditMode ? 'Failed to update role' : 'Failed to create role',
      //   description: (error as Error).message,
      //   type: 'error',
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCategoryFullySelected = (categoryPermissions: any[]) => {
    return categoryPermissions.every(p => formData.permissions.includes(p.name));
  };

  const isCategoryPartiallySelected = (categoryPermissions: any[]) => {
    return !isCategoryFullySelected(categoryPermissions) && 
           categoryPermissions.some(p => formData.permissions.includes(p.name));
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate(isEditMode ? `/roles/${id}` : '/roles')}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Role' : 'Create Role'}
          </h1>
          <p className="mt-1 text-gray-500">
            {isEditMode ? 'Update role details and permissions.' : 'Define a new role with specific permissions.'}
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Role Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
              </div>
              
              {/* Permissions */}
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-3">Role Permissions</h3>
                {errors.permissions && (
                  <p className="mb-2 text-sm text-red-600">{errors.permissions}</p>
                )}
                
                <div className="space-y-6">
                  {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                    <div key={category} className="border border-gray-200 rounded-md overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${category}`}
                            checked={isCategoryFullySelected(categoryPermissions)}
                            onChange={() => handleCategorySelectAll(category, categoryPermissions)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm font-medium text-gray-900 capitalize"
                          >
                            {category}
                            {isCategoryPartiallySelected(categoryPermissions) && (
                              <span className="ml-2 text-xs font-normal text-gray-500">
                                (Partially selected)
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                      
                      <div className="divide-y divide-gray-200">
                        {categoryPermissions.map((permission: any) => (
                          <div key={permission.id} className="px-4 py-3 flex items-start">
                            <input
                              type="checkbox"
                              id={`permission-${permission.id}`}
                              checked={formData.permissions.includes(permission.name)}
                              onChange={() => handlePermissionChange(permission.name)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                            />
                            <label 
                              htmlFor={`permission-${permission.id}`}
                              className="ml-2 text-sm text-gray-700"
                            >
                              <div className="font-medium">
                                {permission.name.split(':')[1].charAt(0).toUpperCase() + 
                                 permission.name.split(':')[1].slice(1)}
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {permission.description}
                              </p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end space-x-3 border-t border-gray-200 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(isEditMode ? `/roles/${id}` : '/roles')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                leftIcon={<Save size={16} />}
                isLoading={isSubmitting}
              >
                {isEditMode ? 'Save Changes' : 'Create Role'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};