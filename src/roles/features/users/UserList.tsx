import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreHorizontal, Trash, Edit, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/post-auth/ui/roles/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TablePagination } from '../../../components/post-auth/ui/roles/Table';
import { Button } from '../../../components/post-auth/ui/roles/Button';
import { Modal } from '../../../components/post-auth/ui/roles/Modal';
import { Pagination } from '../../../components/post-auth/ui/roles/common/Pagination';
import { User } from '../../../types/roles';
import { users, deleteUser } from '../../data/users';
import { formatDate } from '../../../utils/roles/helpers';
// import { useToast } from '../../../components/post-auth/ui/roles/Toaster';

export const UserList: React.FC = () => {
  const navigate = useNavigate();
  // const { toast } = useToast();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  
  const usersPerPage = 8;
  
  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedStatus]);

  const filterUsers = () => {
    let result = [...users];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        user => 
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter(user => user.status === selectedStatus);
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
    setDropdownOpen(null);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      
      // Update filtered users
      setFilteredUsers(filteredUsers.filter(user => user.id !== userToDelete.id));
      
      // toast({
      //   title: 'User deleted',
      //   description: `${userToDelete.name} has been deleted successfully.`,
      //   type: 'success',
      // });
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const toggleDropdown = (userId: string) => {
    setDropdownOpen(dropdownOpen === userId ? null : userId);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-gray-500">Manage user accounts and their role assignments.</p>
        </div>
        <Button 
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/users/create')}
        >
          Add User
        </Button>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4">
          <CardTitle>All Users</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <select
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive')}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 mr-2">
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
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-gray-50 text-gray-700'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(user.lastActive)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleDropdown(user.id)}
                          className="p-1"
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                        
                        {dropdownOpen === user.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                            <Link
                              to={`/users/${user.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setDropdownOpen(null)}
                            >
                              <Eye size={16} className="mr-2" />
                              View Details
                            </Link>
                            <Link
                              to={`/users/${user.id}/edit`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setDropdownOpen(null)}
                            >
                              <Edit size={16} className="mr-2" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(user)}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              <Trash size={16} className="mr-2" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No users found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {filteredUsers.length > 0 && (
            <TablePagination>
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </TablePagination>
          )}
        </CardContent>
      </Card>
      
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
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        }
      >
        <div className="py-4">
          {userToDelete && (
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                {userToDelete.avatar ? (
                  <img src={userToDelete.avatar} alt={userToDelete.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white">
                    {userToDelete.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{userToDelete.name}</div>
                <div className="text-sm text-gray-500">{userToDelete.email}</div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};