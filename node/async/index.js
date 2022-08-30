
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });

async function processCustomer(id){
    const customer = await getCustomer(id);
    console.log("Customer:", customer);
    const topMovies = await getTopMovies();
    console.log("Top movies:", topMovies);
    const email = await sendEmail(customer.email, topMovies);
}

processCustomer(3);
  
  function getCustomer(id) {
    return new Promise((resolve, reject) => {
        console.log("Getting customer with id", id, "...")
        setTimeout(() => {
            resolve({ 
              id: id, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000);  
    });
  }
  
  function getTopMovies() {
    return new Promise((resolve, reject) => {
        console.log("Getting the list of top movies...")
        setTimeout(() => {
            reject(['movie1', 'movie2']);
          }, 4000);
    });
  }
  
  function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        console.log("Sending Email...")
        setTimeout(() => {
            resolve();
            console.log("Email sent!")
          }, 4000);
    });
  }