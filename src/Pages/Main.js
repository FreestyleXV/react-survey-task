import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import '../Styles/Style.css'

export default function Main(props) {

    const [data, setData] = useState({})
    const [dataFetchStatus, setDataFetchStatus] = useState("not")
    const [page, setPage] = useState(1)
    const [searchId, setSearchId] = useState("")
    let { id } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        if(id===undefined || id==="id"){
            navigate("./1")
        }
        if(props.type==="page"){
            setPage(parseInt(id))
            fetch(`https://reqres.in/api/products?per_page=5&page=${page}`)
            .then(res=>{res.json().then(json=>{setData(json); setDataFetchStatus("ok"); console.log(json)})})
            .catch(err=>{setDataFetchStatus("error")})
        }
        else{
            setSearchId(parseInt(id))
            fetch(`https://reqres.in/api/products?id=${searchId}`)
            .then(res=>{res.json().then(json=>{if(json.data){setData(json); setDataFetchStatus("search")}else{setDataFetchStatus("nosearch")}})})
            .catch(err=>{setDataFetchStatus("error")})
        }
    }, [page, searchId, navigate, props.type, id])
  
    let changePage = (turn)=>{
        console.log(id)
      if(turn){
        if(page>1){
          navigate(`../${page-1}`)
          setPage(page-1)
        }
      }
      else{
        if(page<data.total_pages){
            navigate(`../${page+1}`)
            setPage(page+1)
        }
      }
    }
  
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  
    let search = (e) => {
      let value = e.target.value
      if(value.length>0){
        if(numbers.includes(value[value.length-1])){navigate(`../id/${e.target.value}`);setSearchId(e.target.value)}
      }
      else{
        navigate(`../1`)
        setSearchId(e.target.value)
      }
      
    }
  
    return (
      <div className="App">
        <input type={'text'} value={searchId} onChange={(e)=>{search(e)}}></input>
        <table>
        {dataFetchStatus==="ok"
        ?<tbody>
          {data.data.map(el=><tr key={el.id} style={{'backgroundColor':el.color}}><td style={{'width':'25%'}}>{el.id}</td><td style={{'width':'50%'}}>{el.name}</td><td style={{'width':'25%'}}>{el.year}</td></tr>)}
          <tr>
            <td style={{'width':'25%'}} onClick={()=>{changePage(true)}} className='pagination button'>{"<-"}</td>
            <td style={{'width':'50%'}} className='pagination'>--- {data.page} ---</td>
            <td style={{'width':'25%'}} onClick={()=>{changePage(false)}} className='pagination button'>{"->"}</td>
          </tr>
        </tbody>
        :dataFetchStatus==="search"
        ?<tbody><tr style={{'backgroundColor':data.data.color}}><td style={{'width':'25%'}}>{data.data.id}</td><td style={{'width':'50%'}}>{data.data.name}</td><td style={{'width':'25%'}}>{data.data.year}</td></tr></tbody> 
        :dataFetchStatus==="nosearch"
        ?<tbody><tr><td>No results found.</td></tr></tbody>
        :<tbody><tr><td>Data fetch error.</td></tr></tbody>}
        </table>
      </div>
    );
}
