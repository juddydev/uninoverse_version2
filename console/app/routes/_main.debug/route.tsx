export default function Route() {
  return null

  // const data = useLoaderData<typeof loader>()
  // return (
  //   <Table className="overflow-x-auto text-nowrap">
  //     <TableHeader>
  //       <TableRow>
  //         <TableHead>{"ID"}</TableHead>
  //         <TableHead>{"Option 1"}</TableHead>
  //         <TableHead>{"Option 2"}</TableHead>
  //         <TableHead>{"Variants"}</TableHead>
  //       </TableRow>
  //     </TableHeader>
  //     <TableBody>
  //       {data.map((product) => (
  //         <TableRow key={product.id}>
  //           <TableCell>{product.id}</TableCell>
  //           {product.options.map((option) => (
  //             <TableCell key={option.id}>
  //               <p>{option.name}</p>
  //             </TableCell>
  //           ))}
  //           {product.variants.map((variant) => (
  //             <Fragment key={variant.id}>
  //               <TableCell>
  //                 <p>{variant.title}</p>
  //               </TableCell>
  //               <TableCell>
  //                 <p>{variant.inventory_quantity}</p>
  //               </TableCell>
  //             </Fragment>
  //           ))}
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // )
}
