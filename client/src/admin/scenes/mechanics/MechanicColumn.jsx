import { Link } from 'react-router-dom';


export const mechanicColumns = [
  {
    field: "name",
    headerName: "Name",
    headerClassName: 'text-lg',
    cellClassName: "name-column--cell",
    sortable: false,
    minWidth: 150,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        <Link  
          to={{
            pathname: '/admin/mechanicdetails',
            search: `?mechanic=${params.row._id}`,
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {params.value}
        </Link>
      </div>
    ),
  },
  {
    field: "phoneNo",
    headerName: "Phone Number",
    headerClassName: 'text-lg',
    flex: 0.4,
    minWidth: 140,
    sortable: false,
    renderCell: (params) => (
      <div className='text-lg whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "monthlyAmount",
    headerName: "This Month",
    headerClassName: 'text-lg',
    flex: 0.3,
    minWidth: 150,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal hover:text-[#c35574] hover:underline font-semibold'>
        <Link 
        to={{
          pathname: '/admin/customerinvoices',
          search: `?mechanicmonthly=${params.row._id}&id=${params.row.name}`,
        }}
        target="_blank"
        rel="noopener noreferrer"
        >
          ₹{params.value}
          <img src='/google-drive.png' className='h-8 inline pl-2' />
        </Link>
      </div>
    ),
  },
  {
    field: "totalAmount",
    headerName: "Total",
    headerClassName: 'text-lg',
    flex: 0.3,
    minWidth: 150,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal hover:text-[#c35574] hover:underline font-semibold'>
        <Link 
        to={{
          pathname: '/admin/customerinvoices',
          search: `?mechanictotal=${params.row._id}&id=${params.row.name}`,
        }}
        target="_blank"
        rel="noopener noreferrer"
        >
          ₹{params.value}
          <img src='/google-drive.png' className='h-8 inline pl-2' />
        </Link>
      </div>
    ),
  }
];