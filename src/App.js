// import Axios from 'axios';
import React from 'react';
import './App.css';

export default class App extends React.Component {

  constructor(props)
{
  super(props);
  this.state={
    char_id:10,
    data:[],
    quote:[],
    search:"",
    isLoaded:false 
  }
  this.getData=this.getData.bind(this);
  this.pageNumberClick=this.pageNumberClick.bind(this);
  this.searchCharacter=this.searchCharacter.bind(this);
}
getData()
{
  const {char_id}=this.state;
  const urlOne=`https://www.breakingbadapi.com/api/characters?char_id=${char_id}`;
  const urlTwo="https://www.breakingbadapi.com/api/quotes";
  this.setState(
    {
      data:[],
      isLoaded:true
    }
  )
  Promise.all([
    fetch(urlOne).then(res => res.json()),
    fetch(urlTwo).then(res => res.json())
]).then(([urlOneData, urlTwoData]) => {
    this.setState({
        data: urlOneData,
        quote:urlTwoData,
        isLoaded:false
    });
})
.catch((err) => {
  console.log(err);
  this.setState({
    data:[],
    isLoaded:false
  })
});
}
pageNumberClick(e)
{
  const char_id=e.target.value;
  this.setState({
    search:'',
    char_id
  })
  this.getData();
}
searchCharacter(e){
  const search=e.target.value;
  this.setState(
    {
      search
    }
  )
};
componentDidMount()
{
this.getData();
}
  render()
  {
  this.state.data.forEach(function(element)
    {
      if(element.appearance.length===0)
      {
           element.appearance="None";     
      }
      
    })
    const characterData=this.state.data.filter((item,index)=>{
       if(this.state.search==="")
       {
        if((index>=this.state.char_id-10) && index<this.state.char_id)

                {
                  return item;
                }     
       }
       else if(item.name.toLowerCase().includes(this.state.search.toLowerCase()))
       {
              return item;
       }
    }).map((item)=>
    {  
      {
        return( 
          <div className="characterBox">
          <div className="imagebox"><img src={item.img} alt={item.name}></img></div>
          <div className="infobox"><div className="labelbox">Character Name -</div>
          <div className="characterinfo">{item.name}</div>
          </div>
          <div className="infobox"><div className="labelbox">D.O.B -</div>
          <div className="characterinfo">{item.birthday}</div>
          </div>
          <div className="infobox"><div className="labelbox">Occupation -</div>
          <div className="characterinfo">{item.occupation}</div>
          </div>
          <div className="infobox"><div className="labelbox">Status -</div>
          <div className="characterinfo">{item.status}</div>
          </div>
          <div className="infobox"><div className="labelbox">Nickname -</div>
          <div className="characterinfo">{item.nickname}</div>
          </div>
          <div className="infobox"><div className="labelbox">Actor Name -</div>
          <div className="characterinfo">{item.portrayed}</div>
          </div>
          <div className="infobox"><div className="labelbox">Appearances -</div>
          <div className="characterinfo">{item.appearance+" "}</div>
          </div>
        </div>
        );
      } 
    })
    if(this.state.isLoaded)
    {
      return(<div>Loading...</div>)
    }
      return (
       <>
          <div className="mainHeader">
          <div className="title">
                     Breaking Bad
          </div>
          <div className="searchBar">
          <input type="search" name="search" placeholder="Search Here......" onChange={this.searchCharacter}></input>
          </div>
          </div>
          <div className="sectionBox">
          <div className="buttonBox">
            <ButtonClickComponent name="10" displaynumber="1" onClick={this.pageNumberClick}></ButtonClickComponent>
            <ButtonClickComponent name="20" displaynumber="2" onClick={this.pageNumberClick}></ButtonClickComponent>
            <ButtonClickComponent name="30" displaynumber="3" onClick={this.pageNumberClick}></ButtonClickComponent>
            <ButtonClickComponent name="40" displaynumber="4" onClick={this.pageNumberClick}></ButtonClickComponent>
            <ButtonClickComponent name="50" displaynumber="5" onClick={this.pageNumberClick}></ButtonClickComponent>
            <ButtonClickComponent name="60" displaynumber="6" onClick={this.pageNumberClick}></ButtonClickComponent>
            <ButtonClickComponent name="70" displaynumber="7" onClick={this.pageNumberClick}></ButtonClickComponent>
            </div>
            </div>
          <div className="displayContainerfirst">
             {characterData}
            </div>
        </>
      );
    }
}
const ButtonClickComponent=(props)=>
{
  return(
    <button onClick={props.onClick} className="pagenumberButton" value={props.name} >{props.displaynumber}</button>
  )
}