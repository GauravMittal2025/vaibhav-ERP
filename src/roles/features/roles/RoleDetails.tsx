import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash, Key, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/post-auth/ui/roles/Card';
import { Button } from '../../../components/post-auth/ui/roles/Button';
import { Modal } from '../../../components/post-auth/ui/roles/Modal';
// import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Role } from '../../../types/roles';
import { roles, deleteRole } from '../../data/roles';
import { permissions, getPermissionsByCategory } from '../../data/permissions';
import { users } from '../../data/users';
// import { formatDate } from '../../utils/helpers';
import { formatDate } from '../../../utils/roles/helpers';
// import { useToast } from '../../../components/post-auth/ui/roles/Toaster';

export const RoleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const { toast } = useToast();
  const [role, setRole] = useState<Role | null>(null);
  const [usersWithRole, setUsersWithRole] = useState<typeof users>([]);
  const [permissionsByCategory, setPermissionsByCategory] = useState<Record<string, any>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // Find role by id
    const foundRole = roles.find(role => role.id === id);
    if (foundRole) {
      setRole(foundRole);
      
      // Find users with this role
      const roleUsers = users.filter(user => user.role.toLowerCase() === foundRole.name.toLowerCase());
      setUsersWithRole(roleUsers);
      
      // Get permissions grouped by category
      setPermissionsByCategory(getPermissionsByCategory());
    } else {
      // Role not found, redirect to roles list
      navigate('/roles');
      // toast({
      //   title: 'Role not found',
      //   type: 'error',
      // });
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (role) {
      // Check if role is assigned to users
      if (role.usersCount > 0) {
        // toast({
        //   title: 'Cannot delete role',
        //   description: `This role is assigned to ${role.usersCount} user${role.usersCount === 1 ? '' : 's'}.`,
        //   type: 'error',
        // });
        setIsDeleteModalOpen(false);
        return;
      }
      
      deleteRole(role.id);
      setIsDeleteModalOpen(false);
      navigate('/roles');
      
      // toast({
      //   title: 'Role deleted',
      //   description: `${role.name} has been deleted successfully.`,
      //   type: 'success',
      // });
    }
  };

  if (!role) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate('/roles')}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Role Details</h1>
            <p className="mt-1 text-gray-500">View and manage role information and permissions.</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<Edit size={16} />}
            onClick={() => navigate(`/roles/${role.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            leftIcon={<Trash size={16} />}
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={role.usersCount > 0}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <p className="text-gray-500 mt-1">{role.description}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Assigned Users</span>
                    <span className="font-medium text-gray-900">{role.usersCount}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Permissions</span>
                    <span className="font-medium text-gray-900">{role.permissions.length}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium text-gray-900">{formatDate(role.createdAt)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="font-medium text-gray-900">{formatDate(role.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users size={18} className="mr-2 text-blue-600" />
                Users with this Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              {usersWithRole.length > 0 ? (
                <div className="space-y-3">
                  {usersWithRole.map(user => (
                    <Link 
                      key={user.id}
                      to={`/users/${user.id}`}
                      className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                    >
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 mr-3 flex-shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white">
                            {user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">{user.name}</div>
                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p>No users have been assigned this role yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key size={18} className="mr-2 text-blue-600" />
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">
                      {category}
                    </h4>
                    <div className="bg-gray-50 rounded-md p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryPermissions.map((permission: any) => {
                          const isGranted = role.permissions.includes(permission.name);
                          return (
                            <div 
                              key={permission.id}
                              className={`p-3 rounded-md border ${
                                isGranted 
                                  ? 'border-green-200 bg-green-50' 
                                  : 'border-gray-200 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {permission.name.split(':')[1].charAt(0).toUpperCase() + 
                                     permission.name.split(':')[1].slice(1)}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {permission.description}
                                  </div>
                                </div>
                                <div>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    isGranted 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {isGranted ? 'Granted' : 'Not granted'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Role"
        description="Are you sure you want to delete this role? This action cannot be undone."
        footer={
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={role.usersCount > 0}
            >
              Delete
            </Button>
          </div>
        }
      >
        <div className="py-4">
          <div>
            <div className="font-medium text-gray-900">{role.name}</div>
            <div className="text-sm text-gray-500 mt-1">{role.description}</div>
            
            {role.usersCount > 0 && (
              <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md text-sm">
                <div className="font-medium">Warning</div>
                <p>
                  This role is currently assigned to {role.usersCount} user{role.usersCount === 1 ? '' : 's'}.
                  You need to reassign these users to a different role before deleting.
                </p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};