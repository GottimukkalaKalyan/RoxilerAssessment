

const CreatingTableRows = (props) => {
   const {eachOne} = props
   return(
      <tr className="row-container">
         <th scope="row">{eachOne.id}</th>
         <td>{eachOne.title}</td>
         <td>
            {eachOne.description}
         </td>
         <td>{eachOne.price}</td>
         <td>{eachOne.category}</td>
            <td>{eachOne.sold}</td>
         <td>
            <img src={eachOne.image} className="product-image" alt="product"/>
         </td>
      </tr>
   )
 }

 export default CreatingTableRows