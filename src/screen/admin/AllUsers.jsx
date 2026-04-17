import React from 'react'
import DynamicTable from '../../components/ui/DynamicTable';

const AllUsers = () => {
  const columns = [
    { id: "name", label: "Name" },
    { id: "calories", label: "Calories" },
    { id: "fat", label: "Fat" },
  ];

  const rows = [
    { name: "Frozen yoghurt", calories: 159, fat: 6.0 },
    { name: "Ice cream sandwich", calories: 237, fat: 9.0 },
    { name: "Eclair", calories: 262, fat: 16.0 },
    { name: "Cupcake", calories: 305, fat: 3.7 },
    { name: "Gingerbread", calories: 356, fat: 16.0 },
  ];

  return (
    <div>
      <DynamicTable columns={columns} data={rows} />
    </div>
  )
}

export default AllUsers
