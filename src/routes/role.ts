const role = {
  path: '/role',
  children: [
    {
      path: '/',
      method: 'POST',
      controller: 'role/create',
    },
    {
      path: '/',
      method: 'GET',
      controller: 'role/list',
    },
    {
      path: '/:id',
      method: 'GET',
      controller: 'role/detail',
    },
    {
      path: '/:id',
      method: 'PUT',
      controller: 'role/update',
    },
    {
      path: '/:id',
      method: 'DELETE',
      controller: 'role/delete',
    },
  ],
};

export default role;
