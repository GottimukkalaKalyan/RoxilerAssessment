import { Component } from "react";

import './App.css';
import CreatingTableRows from "./component/tableItem";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts"






class App extends Component {
  state = {
    tableData:[],
    OFFSET:0,
    LIMIT:5,
    searched:"",
    month:"3",
    staticCount:[],
    staticUpdated:false,
    barMonth:""
  }

  componentDidMount() {
    this.getNext()
  }

  

  getNext = async () => {
    const {OFFSET,LIMIT,searched,month} = this.state
    const monthToString = parseInt(month) > 9 ? (month) : ("0"+(month))
    const api = `http://localhost:3001/getdata?search=${searched}&month=${monthToString}&offset=${OFFSET}&limit=${LIMIT}`
    const response = await fetch(api)
    const data = await response.json()
    this.setState({tableData:data})
    const StaticUrl = `http://localhost:3001/getStatic?month=${monthToString}`
    const staticResponse = await fetch(StaticUrl)
    const ststicData = await staticResponse.json()
    this.setState({staticCount:ststicData,staticUpdated:true})
  }

  seachAProduct = (event) => {
    this.setState({searched:event.target.value})
    console.log(event.target.value)
  }

  changeMonth = (event) => {
    this.setState({month:event.target.value},this.getNext)
  }
  changeStaticMonth = (event) => {
    this.setState({month:event.target.value},this.getNext)
  }

  changeStaticBarMonth = (event) => {
    this.setState({barMonth:event.target.value},this.getNext)
  }

  clickNext = () => {
    this.setState(prevState => ({OFFSET:prevState.OFFSET+5}),this.getNext)
  }

  clickPrevious = () => {
    const {OFFSET} = this.state
    if (OFFSET > 0){
      this.setState(prevState => ({OFFSET:prevState.OFFSET-5}),this.getNext)
    }
  }

  CreatingRows = (eachOne) => {
    const datatestID = "productItemID" + toString(eachOne.id)
        return(
          <tr className="row-container">
            <th scope="row">{eachOne.id}</th>
            <td>{eachOne.title}</td>
            <td>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={datatestID}>
                Launch demo modal
              </button>
              <div class="modal fade" id={datatestID} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    {eachOne.description}
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
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

  searchedForm = (event) => {
    event.preventDefault()
    this.getNext()
  }

  DataFormatter = (number) => {
    return `${(number).toString()}`
  }

  render() {
    const {tableData,staticCount,staticUpdated} = this.state
    const Random1 = (Math. random() * 100) + 1;
    const Random2 = (Math. random() * 100) + 1;
    const Random3 = (Math. random() * 100) + 1;
    const Random4 = (Math. random() * 100) + 1;
    const Random5 = (Math. random() * 100) + 1;
    const Random6 = (Math. random() * 100) + 1;
    const Random7 = (Math. random() * 100) + 1;
    const Random8 = (Math. random() * 100) + 1;
    const Random9 = (Math. random() * 100) + 1;
    const Random10 = (Math. random() * 100) + 1;

  const Bardata = [
    {
      group_name: "0-100",
      boys: Random1,
    },
    {
      group_name: "101-200",
      boys: Random3,
    },
    {
      group_name: "201-300",
      boys: Random2,
    },
    {
      group_name: "301-400",
      boys: Random4,
    },
    {
       group_name: "401-500",
       boys: Random5,
     },
     {
       group_name: "501-600",
       boys: Random6,
     },
     {
       group_name: "601-700",
       boys: Random7,
     },
     {
       group_name: "701-800",
       boys: Random8,
     },
     {
       group_name: "801-900",
       boys: Random9,
     },
     {
       group_name: "901-above",
       boys: Random10,
     },
  ]
    return (
      <div className="App">
          <div className="sub-container">
            <div className="dashboard-container">
              <div className="heading-card">
                <h1 className="transaction-heading">Transaction Dashboard</h1>
              </div>
            </div>
            <div className="search-and-month-container">
              <form onSubmit={this.searchedForm} className="search-and-month-container">
                <input type="search" className="form-contro input-field" placeholder="Search Transaction" onChange={this.seachAProduct}/>
                {/* <input type="month" className="form-contro input-field" placeholder="Select Month" /> */}
                <select id='gMonth2' onChange={this.changeMonth} className="form-contro input-field">
                  <option value=''>--Select Month--</option>
                  <option value='1'>Janaury</option>
                  <option value='2'>February</option>
                  <option selected value='3'>March</option>
                  <option value='4'>April</option>
                  <option value='5'>May</option>
                  <option value='6'>June</option>
                  <option value='7'>July</option>
                  <option value='8'>August</option>
                  <option value='9'>September</option>
                  <option value='10'>October</option>
                  <option value='11'>November</option>
                  <option value='12'>December</option>
                </select> 
              </form>
            </div>
            <div className="table-container">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Sold</th>
                    <th scope="col">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tableData.length >= 1 ?
                    
                      tableData.map(eachOne => (
                        <CreatingTableRows eachOne={eachOne} key={eachOne.id} />
                      ))
                     :
                     <div className="no-data-container">
                      <p className="no-data-para">NO RESULT FOUND</p>
                     </div>
                  }
                </tbody>
              </table>
              <div className="next-container">
                <p className="active-para">Active page</p>
                <div className="next-previous">
                  <button type="button" className="button-next" onClick={this.clickPrevious}>Previous</button>
                  -
                  <button type="button" className="button-next" onClick={this.clickNext}>Next</button>
                </div>
                <p className="active-para">Total pages</p>
              </div>
            </div>
            <div className="static-container">
              <div className="static-and-dropdown">
                <h1>Static - </h1>
                <select id='gMonth2' onChange={this.changeStaticMonth} className="form-control static-drop">
                  <option value=''>--Select Month--</option>
                  <option value='1'>Janaury</option>
                  <option value='2'>February</option>
                  <option selected value='3'>March</option>
                  <option value='4'>April</option>
                  <option value='5'>May</option>
                  <option value='6'>June</option>
                  <option value='7'>July</option>
                  <option value='8'>August</option>
                  <option value='9'>September</option>
                  <option value='10'>October</option>
                  <option value='11'>November</option>
                  <option value='12'>December</option>
                </select>
              </div>
              {staticUpdated && 
                <div className="static-card-container">
                  <div className="item-1">
                    <h4>Total Sale</h4>
                    <h4>{parseInt(staticCount[0].price)}</h4>
                  </div>
                  <div className="item-1">
                    <h4>Total sold item</h4>
                    <h4>{staticCount[0].sold_count}</h4>
                  </div>
                  <div className="item-1">
                    <h4>Total not sold item</h4>
                    <h4>{staticCount[0].not_sold_count}</h4>
                  </div>
                </div>
              }
            </div>
            <div className="barchart-graph mt-4">
              <div className="static-and-dropdown mb-4">
                  <h1>Bar chart Stats - </h1>
                  <select id='gMonth2' onChange={this.changeStaticBarMonth} className="form-control static-drop ">
                    <option value=''>--Select Month--</option>
                    <option value='1'>Janaury</option>
                    <option value='2'>February</option>
                    <option selected value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={500}>
                  <BarChart
                    data={Bardata}
                    margin={{
                      top: 5,
                    }}
                  >
                    <XAxis
                      dataKey="group_name"
                      tick={{
                        stroke: "gray",
                        strokeWidth: 1,
                      }}
                    />
                    <YAxis
                      tickFormatter={this.DataFormatter}
                      tick={{
                        stroke: "gray",
                        strokeWidth: 0,
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        padding: 30,
                      }}
                    />
                    <Bar dataKey="boys" fill="#2d96a8" barSize="20%" />
                  </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
