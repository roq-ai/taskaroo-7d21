const mapping: Record<string, string> = {
  consumers: 'consumer',
  customers: 'customer',
  users: 'user',
  vendors: 'vendor',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
