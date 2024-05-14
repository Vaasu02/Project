export const validateEmail=(email)=>{
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());

};


export const getinitials=(name)=>{
    if(!name) return ""; // if the name parameter is provided. If not, it returns an empty string.

    const words=name.split(" "); //splits the name into an array of words using the split(" ") method.
    let initials="";

    for(let i=0;i<Math.min(words.length,2);i++){//The loop runs up to a maximum of 2 iterations to ensure that only the first two words' initials are considered.
        initials += words[i][0]; // the first character of the current word is appended to the initials string
    }

    return initials.toUpperCase();
}

