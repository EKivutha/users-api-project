type Address ={
        stree:string
        suite:string
        city:string
        zipcode:string
        geo: Geo
       
}

type Geo = {
    
        lat:string
        lng:string
}

export default Address