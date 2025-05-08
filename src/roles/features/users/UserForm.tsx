import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/post-auth/ui/roles/Card';
import { Button } from '../../../components/post-auth/ui/roles/Button';
// import { User } from '../../../types/roles';
import { users, createUser, updateUser } from '../../data/users';
import { roles } from '../../data/roles';
// import { useToast } from '../../../components/post-auth/ui/roles/Toaster';
import { addActivityLog } from '../../data/activity';
// import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../../context/AppContext';

export const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const { toast } = useToast();
  const { user: users } = useAppContext();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    avatar?: string;
  }>({
    name: '',
    email: '',
    role: '',
    status: 'active',
    avatar: '',
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    role?: string;
  }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const userToEdit = users.find(user => user.id === id);
      
      if (userToEdit) {
        setFormData({
          name: userToEdit.name,
          email: userToEdit.email,
          role: userToEdit.role,
          status: userToEdit.status,
          avatar: userToEdit.avatar || '',
        });
      } else {
        navigate('/users');
        // toast({
        //   title: 'User not found',
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditMode) {
        // Update existing user
        const updatedUser = updateUser(id!, formData);
        
        if (updatedUser) {
          // Log activity
          addActivityLog({
            userId: users?.id || '',
            userName: users?.name || '',
            action: 'updated',
            resource: 'user',
            resourceId: updatedUser.id,
          });
          
          // toast({
          //   title: 'User updated',
          //   description: `${updatedUser.name} has been updated successfully.`,
          //   type: 'success',
          // });
          
          navigate(`/users/${updatedUser.id}`);
        } else {
          throw new Error('Failed to update user');
        }
      } else {
        // Create new user
        const newUser = createUser(formData);
        
        // Log activity
        addActivityLog({
          userId: users?.id || '',
          userName: users?.name || '',
          action: 'created',
          resource: 'user',
          resourceId: newUser.id,
        });
        
        // toast({
        //   title: 'User created',
        //   description: `${newUser.name} has been created successfully.`,
        //   type: 'success',
        // });
        
        navigate(`/users/${newUser.id}`);
      }
    } catch (error) {
      // toast({
      //   title: isEditMode ? 'Failed to update user' : 'Failed to create user',
      //   description: (error as Error).message,
      //   type: 'error',
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate(isEditMode ? `/users-management/${id}` : '/users-management')}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit User' : 'Create User'}
          </h1>
          <p className="mt-1 text-gray-500">
            {isEditMode ? 'Update user information and role.' : 'Add a new user to the system.'}
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.role ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a role</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.name.toLowerCase()}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar URL (optional)
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  value={formData.avatar || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty to use the initial of the user's name.
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end space-x-3 border-t border-gray-200 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(isEditMode ? `/users/${id}` : '/users')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                leftIcon={<Save size={16} />}
                isLoading={isSubmitting}
              >
                {isEditMode ? 'Save Changes' : 'Create User'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};