interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Vendors'],
  tenantRoles: ['Consumer'],
  tenantName: 'Customer',
  applicationName: 'Taskaroo',
  addOns: ['chat', 'file', 'notifications'],
};
