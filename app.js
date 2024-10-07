const loadAllProduct = () =>{
    fetch('https://dummyjson.com/users?limit=5')
    .then(res => res.json())
    .then( (data) => {
        displayallplayers(data.users)
    })
    .catch((err) => {
        console.log(err)
    })
}

let male = 0, female = 0

const update_count_pos = () => {
    document.getElementById("total-count").innerHTML = `Total : ${female+male}`
    document.getElementById("male-count").innerHTML = `Male : ${male}`
    document.getElementById("female-count").innerHTML = `Female : ${female}`
}


displayallplayers = (players) => {
    
    const playerContainer = document.getElementById("player-section")
    players.forEach(player =>{

        // console.log(player);

        let playerDiv= document.createElement("div")
        playerDiv.classList.add("col-lg-4")
        playerDiv.classList.add("col-md-6")
        playerDiv.classList.add("col-12")
        playerDiv.classList.add("my-2")
        
        playerDiv.innerHTML = `
        
            <div class="card" >
                <img class="card-img-top" src="${player.image}" alt="Card image cap">
                    <div class="card-body">
                              
                    <h5 class="card-title">${player.firstName}</h5>
                    <p>
                    ${player.email.slice(0,28)} </br>
                    ${player.phone} </br>
                    ${player.address.city} </br>
                    ${player.address.country} </br>
                    ${player.gender}
                    </p>

                    <a href="#" class="btn btn-primary" onclick="showDetails(${player.id})">Details</a>
                    <a href="#" class="btn btn-primary" onclick="addPlayer(${player.id})">Add to Group</a>

                    

                </div>
            </div>

        `
        

        // console.log(playerDiv);
        playerContainer.appendChild(playerDiv)

    })
}



const addPlayer = (id) => {
    

    if((male + female) >= 11){
        alert("limit exceed")
        return
    }

    fetch(`https://dummyjson.com/users/${id}`)
    .then(res => res.json())
    .then( (player) => {
        



        const guideContainer = document.getElementById("guide-section")
        let guideDiv= document.createElement("div")
        guideDiv.classList.add("col-lg-12")
        guideDiv.classList.add("col-md-6")
        guideDiv.classList.add("col-sm-12")
        guideDiv.classList.add("my-2")

        guideDiv.innerHTML = `
        
            <div class="card" >
                <img class="card-img-top" src="${player.image}" alt="Card image cap">
                    <div class="card-body">
                              
                    <h5 class="card-title">${player.firstName}</h5>
                    <p>
                    ${player.email.slice(0,28)} </br>
                    ${player.phone} </br>
                    ${player.address.city} </br>
                    ${player.address.country} </br>
                    ${player.gender}
                    </p>

                    <a href="#" class="btn btn-primary" onclick="showDetails(${player.id})">Details</a>
                    <a href="#" class="my-2 btn btn-danger" onclick="removePlayer(${player.id})">Remove From  Group</a>
                </div>
            </div>

        `
        
        if(player.gender == "male") male = male + 1
        else if(player.gender == "female") female = female + 1
        
        guideContainer.appendChild(guideDiv)
        update_count_pos()


    })
    .catch((err) => {
        console.log(err)
    })

}


const search_by_name = () => {

    let searchName = document.getElementById("search").value
    console.log(searchName);

    fetch(`https://dummyjson.com/users/search?q=${searchName}`)
    .then(res => res.json())
    .then((data) => {
        
        displayallplayers(data.users)
    });

}





loadAllProduct()