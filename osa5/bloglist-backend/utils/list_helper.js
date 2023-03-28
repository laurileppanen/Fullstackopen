const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {

    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
} 

const favoriteBlog = (blogs) => {
    
    const reducer = (max, item) => {
        return Math.max(max, item.likes)
    }
    const maksimi = blogs.reduce(reducer, 0)
    console.log(maksimi)
    const blogi = blogs.find(blog => blog.likes === maksimi)
    console.log(blogi)
    return blogi
    
}   

const mostBlogs = (blogs) => {
    const nimet = []
    let i = 0
    while (i < blogs.length) {
        if (nimet.includes(blogs[i].author)) {
            i++
        }
        else {
            nimet.push(blogs[i].author)
            i++
        }
        
    }
    const arvot = []
    let j = 0
    while (j < nimet.length) {
        let arvo = 0
        let k = 0
        while (k < blogs.length) {
            if (nimet[j] === blogs[k].author) {
                arvo ++
            }
            k++
        }
        arvot.push(arvo)
        j++
    }

    const maximi = arvot.reduce((a,b) => Math.max(a,b))
    const indeksi = arvot.indexOf(maximi)
    console.log(maximi)
    console.log(indeksi)

    const uusi = {author: nimet[indeksi], blogs: arvot[indeksi]}
    console.log(uusi)

    return uusi
    
}

const mostLikes = (blogs) => {
    const nimet = []
    let i = 0
    while (i < blogs.length) {
        if (nimet.includes(blogs[i].author)) {
            i++
        }
        else {
            nimet.push(blogs[i].author)
            i++
        }
        
    }

    const arvot = []
    let j = 0
    while (j < nimet.length) {
        let arvo = 0
        let k = 0
        while (k < blogs.length) {
            if (nimet[j] === blogs[k].author) {
                arvo += blogs[k].likes
            }
            k++
        }
        arvot.push(arvo)
        j++
    }

    const maximi = arvot.reduce((a,b) => Math.max(a,b))
    const indeksi = arvot.indexOf(maximi)
    console.log(maximi)
    console.log(indeksi)

    const uusi = {author: nimet[indeksi], likes: arvot[indeksi]}
    console.log(uusi)

    return uusi

}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }