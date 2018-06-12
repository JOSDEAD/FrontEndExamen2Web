import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Clientes',
    icon: 'fa fa-user',
    link: '/pages/clientes/consultar',
  },
  {
    title: 'Productos',
    icon: 'fa fa-shopping-bag',
    link: '/pages/productos/consultar',
  
  },
  {
    title: 'Inventario',
    icon: 'fa fa-database',
    link: '/pages/inventarios/consultar',
  },
  {
    title: 'Facturacion',
    icon: 'fa fa-credit-card',
    link: '/pages/facturacion/consultar',
  },
];
