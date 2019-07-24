import sheet from '@/sheet/router';
import excel from '@/excel/router';

const routes = [
  {
    path: '',
    redirect: 'excel'
  },
  ...sheet,
  ...excel
];

export default routes;
