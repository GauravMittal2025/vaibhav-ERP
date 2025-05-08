import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, MoreHorizontal, Trash, Edit, Eye, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/post-auth/ui/roles/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TablePagination } from '../../../components/post-auth/ui/roles/Table';
import { Button } from '../../../components/post-auth/ui/roles/Button';
import { Modal } from '../../../components/post-auth/ui/roles/Modal';
import { Pagination } from '../../../components/post-auth/ui/roles/common/Pagination';
import { Role } from '../../../types/roles';
import { roles, deleteRole } from '../../data/roles';
import { formatDate } from '../../../utils/roles/helpers';
// import { useToast } from '../../../components/post-auth/ui/roles/Toaster';

export const RoleList: React.FC = () => {
  const navigate = useNavigate();
  // const { toast } = useToast();
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  
  const rolesPerPage = 8;
  
  useEffect(() => {
    filterRoles();
  }, [searchTerm]);

  const filterRoles = () => {
    let result = [...roles];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        role => 
          role.name.toLowerCase().includes(term) ||
          role.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredRoles(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
    setDropdownOpen(null);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      // Check if role is in use
      if (roleToDelete.usersCount > 0) {
        // toast({
        //   title: 'Cannot delete role',
        //   description: `This role is assigned to ${roleToDelete.usersCount} user${roleToDelete.usersCount === 1 ? '' : 's'}.`,
        //   type: 'error',
        // });
        setIsDeleteModalOpen(false);
        return;
      }
      
      deleteRole(roleToDelete.id);
      
      setIsDeleteModalOpen(false);
      setRoleToDelete(null);
      
      // Update filtered roles
      setFilteredRoles(filteredRoles.filter(role => role.id !== roleToDelete.id));
      
      // toast({
      //   title: 'Role deleted',
      //   description: `${roleToDelete.name} has been deleted successfully.`,
      //   type: 'success',
      // });
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * rolesPerPage,
    currentPage * rolesPerPage
  );

  const toggleDropdown = (roleId: string) => {
    setDropdownOpen(dropdownOpen === roleId ? null : roleId);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
          <p className="mt-1 text-gray-500">Define and manage roles with specific permissions.</p>
        </div>
        <Button 
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/roles/create')}
        >
          Add Role
        </Button>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4">
          <CardTitle>All Roles</CardTitle>
          <div className="relative mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search roles..."
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRoles.length > 0 ? (
                paginatedRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{role.name}</div>
                        <div className="text-xs text-gray-500">{role.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users size={16} className="text-gray-400 mr-1" />
                        <span>{role.usersCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.length > 3 ? (
                          <>
                            {role.permissions.slice(0, 3).map(perm => (
                              <span 
                                key={perm} 
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                              >
                                {perm.split(':')[1]}
                              </span>
                            ))}
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-700">
                              +{role.permissions.length - 3}
                            </span>
                          </>
                        ) : (
                          role.permissions.map(perm => (
                            <span 
                              key={perm} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                            >
                              {perm.split(':')[1]}
                            </span>
                          ))
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(role.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleDropdown(role.id)}
                          className="p-1"
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                        
                        {dropdownOpen === role.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                            <Link
                              to={`/roles/${role.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setDropdownOpen(null)}
                            >
                              <Eye size={16} className="mr-2" />
                              View Details
                            </Link>
                            <Link
                              to={`/roles/${role.id}/edit`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setDropdownOpen(null)}
                            >
                              <Edit size={16} className="mr-2" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(role)}
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
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No roles found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {filteredRoles.length > 0 && (
            <TablePagination>
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * rolesPerPage) + 1} to {Math.min(currentPage * rolesPerPage, filteredRoles.length)} of {filteredRoles.length} roles
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
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        }
      >
        <div className="py-4">
          {roleToDelete && (
            <div>
              <div className="font-medium text-gray-900">{roleToDelete.name}</div>
              <div className="text-sm text-gray-500 mt-1">{roleToDelete.description}</div>
              
              {roleToDelete.usersCount > 0 && (
                <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md text-sm">
                  <div className="font-medium">Warning</div>
                  <p>
                    This role is currently assigned to {roleToDelete.usersCount} user{roleToDelete.usersCount === 1 ? '' : 's'}.
                    You need to reassign these users to a different role before deleting.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};