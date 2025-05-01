export async function getCountries(poind, type) {
  console.log('type:', type);
  
  let filter = ''
  if(type === 'qita') {
    filter = poind === 'all' ? 'all' : `region/${poind}`
  } else if(type === 'search') {
    filter =`name/${poind}`
  } else {
    console.log("url manzilni to'g'rilang");
    return;
  }

  if(poind) {
    const req = await fetch(`https://restcountries.com/v3.1/${filter}`);
    if (req.status === 200) {
      const res = await req.json();
      return res;
    } else {
      throw new Error("Xatolik bo'ldi, ko'rmisan?");
    }
  }
}
