

// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors(arr) {
    // To get an array with all directors, with a map function, extract this element from the object to a new array
    const directors = arr.map(elm => elm.director)
    return directors
}

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(arr) {
    // Filter each element for Steven Spilberg and if in the genre is includes Drama
    const movSpilberg = arr.filter(elm => elm.director === "Steven Spielberg" && elm.genre.includes("Drama"))
    return movSpilberg.length
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals
function ratesAverage(arr) {
    // If the array is empty, return 0
    if (!arr.length) {
        return 0
    }

    // Obtain the total sum of each element using reduce and initiate with 0, because is an object
    const rateMovie = arr.reduce((acc, elm) => acc + elm.rate, 0)
    // Make the average
    const avgRateMovie = rateMovie / arr.length
    // Round the output to two decimals
    return parseFloat((avgRateMovie).toFixed(2))

}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesRate(arr) {
    // Filter to obtain the Drama movies
    const dramaRate = arr.filter(elm => elm.genre.includes("Drama"))

    // Operate in a similar way to the previous iteration
    if (dramaRate.length === 0) {
        return 0
    } else {
        const sumDramaRate = dramaRate.reduce((acc, elm) => acc + elm.rate, 0)
        const avgDramaRate = sumDramaRate / dramaRate.length
        return parseFloat((avgDramaRate).toFixed(2))
    }

}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(arr) {
    // Copy the original array in other array to sort
    const copyArr = [...arr];
    
    // A double sorting. First, stablish the rules for years. Then, when we have the same year, sort by the title using a nesting sort 
    const yearABCOrder = copyArr.sort(function (a, b) {
        if (a.year > b.year) {
            return 1
        }
        if (a.year < b.year) {
            return -1
        }
        // Nesting sort to sort for the title
        if (a.year == b.year) {
            if (a.title > b.title) {
                return 1
            }
            if (a.title < b.title) {
                return -1
            }
            if (a.title == b.title) {
                return 0
            }
        }
    } )
    return yearABCOrder
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(arr) {
    // Copy the original array in other array to manipulate
    const copyArr = [...arr]
    // Sort the array alphabetically
    const abcOrder = copyArr.sort(function (a, b) {
            if (a.title > b.title) {
                return 1
            }
            if (a.title < b.title) {
                return -1
            }
            if (a.title == b.title) {
                return 0
            }
        }
    )
    
    // Obtain the array with the titles 
    const titleOrder = abcOrder.map(elm => elm.title)
    // Filter to obatein the first twenty ones
    if (titleOrder.length <= 20) {
        return titleOrder
    } else if (titleOrder.length > 20) {
        return titleOrder.splice(0, 20)
    }  
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(arr) {
    // Copy the original array in other array to sort
    const copyArr = [...arr];

    const movieMin = copyArr.map(function (elm) {
        // Considering all the posibilities to obtain the numeric value for the hours and minutes, considering that minutes can have one or two digits

        if (elm.duration.length == 8) {
            const hours = elm.duration.slice(0, 1)
            const min = elm.duration.slice(-5, -3)
            const minutes = parseInt(hours) * 60 + parseInt(min)
            elm.duration = minutes
        } else if (elm.duration.length == 7) {
            const hours = elm.duration.slice(0, 1)
            const min = elm.duration.slice(-4, -3)
            const minutes = parseInt(hours) * 60 + parseInt(min)
            elm.duration = minutes
        } else if (elm.duration.length == 2) {
            const hours = elm.duration.slice(0, 1)
            const minutes = parseInt(hours) * 60 
            elm.duration = minutes
        } else if (elm.duration.length == 5) {
            const min = elm.duration.slice(-5, -3)
            const minutes = parseInt(min)
            elm.duration = minutes
        } else if (elm.duration.length == 4) {
            const min = elm.duration.slice(-4, -3)
            const minutes =  parseInt(min)
            elm.duration = minutes
        }
        
        return elm
    }    
    )
    
   return movieMin
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
function bestYearAvg(arr) {
    // Copy the original array in other array to sort
    const copyArr = [...arr];

    const yearOrder = copyArr.sort((a, b) => a.year - b.year)
    
    const avgYear = [{
        "year": "",
        "avgRate": "",
    }
    ]
    let i = 0;

    

    let j = 0
 
    let avg = 0
    let count = 0
    for (let i = 0; i < yearOrder.length - 1; i++) {
        // console.log(yearOrder[i].year, yearOrder[i+1].year)
        if (yearOrder[i].year == yearOrder[i + 1].year) {
            // console.log(i)
            avgYear[j].year = yearOrder[i].year
            avg += yearOrder[i].rate
            count++
        } else {
            
            avgYear[j].year = yearOrder[i].year
            
            if (count == 0) {
                avg += yearOrder[i].rate
                count = 1
            }
           
            avgYear[j].avgRate = avg / count
            console.log(avgYear[j] ,i)
            j++
            
            avg = 0
            count = 0
        }
        console.log(avgYear[j],i)
        // avgYear[j].avgRate = avg / count
       
        
    }
    // let avge=[]
    // for (let i = 0; i < avgYear.avgRate.length; i++){
    //     avge[i] = avgYear.avgRate[i]
    //     console.log(avge, typeof avge)
    // }

    // console.log(Math.max(avge))
    // Obtain an object with two arrays filtered for year and with the average rate. 
    
        
}