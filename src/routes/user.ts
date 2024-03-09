const user = {
  path: '/user',
  children: [
    {
      path: '/',
      method: 'POST',
      controller: 'user/create',
    },
    {
      path: '/',
      method: 'GET',
      controller: 'user/list'
    },
    {
      path: '/:id',
      method: 'GET',
      controller: 'user/detail',
    },
    {
      path: '/:id',
      method: 'PUT',
      controller: 'user/update',
    },
    {
      path: '/:id',
      method: 'DELETE',
      controller: 'user/delete',
    },
    {
      path: '/:id/role/:roleId',
      method: 'GET',
      controller: 'user/role',
    }
  ],
};

export default user;
