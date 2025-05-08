import { useState, useEffect } from 'react';
import { Search, Filter, KeyRound } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/post-auth/ui/roles/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TablePagination } from '../../../components/post-auth/ui/roles/Table';
import { Pagination } from '../../../components/post-auth/ui/roles/common/Pagination';
import { Permission } from '../../../types/roles';
import { permissions, getPermissionsByCategory } from '../../data/permissions';
import { formatDate } from '../../../utils/roles/helpers';

export const PermissionList: React.FC = () => {
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  
  const permissionsPerPage = 10;
  
  useEffect(() => {
    // Extract unique categories
    const permissionsByCategory = getPermissionsByCategory();
    setCategories(Object.keys(permissionsByCategory));
    
    filterPermissions();
  }, [searchTerm, selectedCategory]);

  const filterPermissions = () => {
    let result = [...permissions];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        permission => 
          permission.name.toLowerCase().includes(term) ||
          permission.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(permission => permission.category === selectedCategory);
    }
    
    setFilteredPermissions(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredPermissions.length / permissionsPerPage);
  const paginatedPermissions = filteredPermissions.slice(
    (currentPage - 1) * permissionsPerPage,
    currentPage * permissionsPerPage
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Permissions</h1>
        <p className="mt-1 text-gray-500">View all available permissions in the system.</p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4">
          <CardTitle>System Permissions</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search permissions..."
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <select
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPermissions.length > 0 ? (
                paginatedPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <KeyRound size={16} className="text-blue-500 mr-2" />
                        <span className="font-medium text-gray-900">{permission.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {permission.description}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                        {permission.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(permission.createdAt)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    No permissions found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {filteredPermissions.length > 0 && (
            <TablePagination>
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * permissionsPerPage) + 1} to {Math.min(currentPage * permissionsPerPage, filteredPermissions.length)} of {filteredPermissions.length} permissions
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
    </div>
  );
};