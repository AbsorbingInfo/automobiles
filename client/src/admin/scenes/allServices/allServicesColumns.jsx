import moment from 'moment'

export const allServicesColumns = [
  {
    field: "registeredNo",
    headerName: "Regd No.",
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
    field: "mechanicname",
    headerName: "Mechanic",
    headerClassName: 'text-lg',
    minWidth: 180,
    sortable: false,
    renderCell:(params) =>{ 
      return (
      <div style={{ whiteSpace: 'pre-wrap', maxHeight: 100, overflowX: 'visible' }}>
        { params.row.mechanic ? params.row.mechanic.name ? params.row.mechanic.name : "" : ""}
      </div>
     )
   },
  },
  {
    field: "make",
    headerName: "Make",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 110,
    sortable: false,
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
    flex: 1,
    minWidth: 170,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "fromDate",
    headerName: "Booking from",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 170,
    sortable: false,
    type: 'date',
    valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
  },
  {
    field: "tillDate",
    headerName: "Booking till",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 170,
    sortable: false,
    type: 'date',
    valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
  },
  {
    field: "mechanic",
    headerName: "Servicing from",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 170,
    sortable: false,
    renderCell: (params) =>(
      <div>
        {moment(params?.value.fromDate).format("DD/MM/YYYY")}<br/>
        {moment(params?.value.fromDate).format("hh:mm:ss A")}
      </div>
  )},
  {
    field: "mechanicTill",
    headerName: "Servicing till",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 170,
    sortable: false,
    renderCell: (params) =>(
      <div>
        {moment(params?.row.mechanic.tillDate).format("DD/MM/YYYY")}<br/>
        {moment(params?.row.mechanic.tillDate).format("hh:mm:ss A")}
      </div>
  )},
  {
    field: "issue",
    headerName: "Issue",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 200,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 150,
    sortable: false,
    cellClassName: "name-column--cell",
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 136,
    sortable: false,
    renderCell: (params) => (
      <div className='text-lg whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "location",
    headerName: "Location",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 100,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "buildingName",
    headerName: "Building",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 200,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  },
  {
    field: "roomNo",
    headerName: "Room No.",
    headerClassName: 'text-lg',
    flex: 1,
    minWidth: 100,
    sortable: false,
    renderCell: (params) => (
      <div className='whitespace-normal'>
        {params.value}
      </div>
    ),
  }
];