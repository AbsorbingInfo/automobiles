import { Link } from 'react-router-dom';
import moment from 'moment'

export const batteryColumns = [
  {
    field: "brand",
    headerName: "Brand",
    headerClassName: 'text-lg',
    cellClassName: "name-column--cell",
    sortable: false,
    minWidth: 150,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "model",
    headerName: "Model",
    headerClassName: 'text-lg',
    flex: 0.4,
    minWidth: 170,
    sortable: false,
    renderCell: (params) => (
      <div className='text-lg whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "serialNumber",
    headerName: "Serial Number",
    headerClassName: 'text-lg',
    flex: 0.3,
    minWidth: 170,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "dateOfSale",
    headerName: "Date Of Sale",
    headerClassName: 'text-lg',
    flex: 0.3,
    minWidth: 150,
    sortable: false,
    type: 'date',
    valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
  },
  {
    field: "registeredNo",
    headerName: "Vehicle No",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 150,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "mrp",
    headerName: "MRP",
    headerClassName: 'text-lg',
    flex: 0.3,
    minWidth: 150,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "sellingPrice",
    headerName: "Selling Price",
    headerClassName: 'text-lg',
    flex: 0.3,
    minWidth: 150,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "replacement",
    headerName: "Replacements",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 150,
    sortable: false,
    renderCell: (params) => (
      <div 
      className='whitespace-normal hover:text-[#c35574] hover:underline'
      >
      <Link 
        to={{
          pathname: '/admin/batteryreplacement',
          search: `?battery=${params.row._id}`,
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
      {params.value.length}
      </Link>
      </div>
    ),
  },
  {
    field: "proRata",
    headerName: "Pro Rata",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 150,
    sortable: false,
    renderCell: (params) => (
      <div>
        {params.value}
      </div>
    ),
  },
];