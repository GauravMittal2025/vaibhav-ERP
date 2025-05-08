import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash, Users, Shield, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/post-auth/ui/roles/Card';
import { Button } from '../../../components/post-auth/ui/roles/Button';
import { Modal } from '../../../components/post-auth/ui/roles/Modal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/post-auth/ui/roles/Table';
import { User } from '../../../types/roles';
import { users, deleteUser } from '../../data/users';
import { roles } from '../../data/roles';
import { activityLogs } from '../../data/activity';
import { formatDate, timeAgo } from '../../../utils/roles/helpers';
// import { useToast } from '../../../components/post-auth/ui/roles/Toaster';

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [userActivities, setUserActivities] = useState<any[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // Find user by id
    const foundUser = users.find(user => user.id === id);
    if (foundUser) {
      setUser(foundUser);
      
      // Find role details
      const foundRole = roles.find(role => role.name.toLowerCase() === foundUser.role.toLowerCase());
      setUserRole(foundRole?.description || '');
      
      // Find user activities
      const userLogs = activityLogs.filter(log => log.userId === id);
      setUserActivities(userLogs);
    } else {
      // User not found, redirect to users list
      navigate('/users');
      // toast({
      //   title: 'User not found',
      //   type: 'error',
      // });
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (user) {
      deleteUser(user.id);
      setIsDeleteModalOpen(false);
      navigate('/users');
      
      // toast({
      //   title: 'User deleted',
      //   description: `${user.name} has been deleted successfully.`,
      //   type: 'success',
      // });
    }
  };

  if (!user) {
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
            onClick={() => navigate('/users')}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
            <p className="mt-1 text-gray-500">View and manage user information.</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<Edit size={16} />}
            onClick={() => navigate(`/users/${user.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            leftIcon={<Trash size={16} />}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 mb-4">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white text-2xl font-medium">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-500 mt-1">{user.email}</p>
                
                <div className="mt-4 w-full">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Status</span>
                    <span className={`font-medium ${user.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Role</span>
                    <span className="font-medium text-blue-600">{user.role}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Last Active</span>
                    <span className="font-medium text-gray-900">{formatDate(user.lastActive)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">Joined</span>
                    <span className="font-medium text-gray-900">{formatDate(user.createdAt)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield size={18} className="mr-2 text-blue-600" />
                Role Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{userRole || 'No role description available.'}</p>
              <Link
                to={`/roles`}
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Manage roles
                <Shield size={14} className="ml-1" />
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users size={18} className="mr-2 text-blue-600" />
                User Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userActivities.length > 0 ? (
                <div className="space-y-4">
                  {userActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="relative mt-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500 absolute top-1 left-1"></div>
                        <div className="h-4 w-4 rounded-full border-2 border-blue-200"></div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{activity.userName}</span>
                          {' '}
                          <span className="text-gray-500">
                            {activity.action} a {activity.resource}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">{timeAgo(activity.timestamp)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p>No activity records found for this user.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles
                    .find(role => role.name.toLowerCase() === user.role.toLowerCase())
                    ?.permissions.map((perm) => {
                      const [category, action] = perm.split(':');
                      return (
                        <TableRow key={perm}>
                          <TableCell>
                            <div className="font-medium text-gray-900">
                              {action.charAt(0).toUpperCase() + action.slice(1)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {perm}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="capitalize">{category}</span>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                              Granted
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    }) || (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                          No permissions found for this role.
                        </TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
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
            >
              Delete
            </Button>
          </div>
        }
      >
        <div className="py-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 mr-3">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};