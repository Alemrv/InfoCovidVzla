var labelultimosDias  = [], labelUltimosActivos = [], labelUltimosNuevos = [], labelUltimosRecuperados = [], labelultimosMuertes  = [], labelTotales = [],     labelEstados = [], labelDataEstados = [], labelGenero = [], labelDataGenero = [], labelEdad = [], labelDataEdad = []

async function chartTotales(){

    await getData();

    const data = {
    labels: ["Total casos confirmados", "Total casos recuperados", "Total Fallecidos", "Total casos activos"],
    datasets: [{
        label: 'Total de casos recuperados',
        backgroundColor:['rgb(249, 110, 70)', 'rgb(18, 78, 120)','rgb(110, 14, 10)', 'rgb(0, 59, 54)'], 
        borderColor: ['rgb(249, 110, 70)', 'rgb(18, 78, 120)','rgb(110, 14, 10)','rgb(0, 59, 54)'],
        data: labelTotales,
        hoverOffset: 4,
    }]
    };

    const config = {
    type: 'pie',
    data: data,
    options: {}
    };

    const myChart = new Chart(
    document.getElementById('myChart'),
    config
    );
}
chartTotales();


 async function chartMuertosNuevos(){

    await getData();

    const data = {
    labels: labelultimosDias,
    datasets: [{
        label: 'Fallecidos en los Últimos 31 días',
        backgroundColor: 'rgb(249, 110, 70)',
        borderColor: 'rgb(249, 110, 70)',
        data: labelUltimosMuertes,
    },{
        label: 'Nuevos casos en los Últimos 31 días',
        backgroundColor: 'rgb(18, 78, 120)',
        borderColor: 'rgb(18, 78, 120)',
        data: labelUltimosNuevos,
    }]
    };

    const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
              suggestedMin: 1,
            }    
        }
    }
    };

    const myChart = new Chart(
    document.getElementById('myChart2'),
    config
    );
}
chartMuertosNuevos();

async function chartActivosRecuperados(){

    await getData();

    const data = {
    labels: labelultimosDias,
    datasets: [{
        label: 'Casos activos en los últimos 31 días',
        backgroundColor: 'rgb(249, 110, 70)',
        borderColor: 'rgb(249, 110, 70)',
        data: labelUltimosActivos,
    },{
        label: 'Recuperados en los Últimos 31 días',
        backgroundColor: 'rgb(18, 78, 120)',
        borderColor: 'rgb(18, 78, 120)',
        data: labelUltimosRecuperados,
    }]
    };

    const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
              suggestedMin: 1,
            }    
        }
    }
    };

    const myChart = new Chart(
    document.getElementById('myChart3'),
    config
    );
}
chartActivosRecuperados();

async function chartEdad(){

    await getData();

    const data = {
    labels: labelEdad,
    datasets: [{
        label: 'Casos por edad',
        backgroundColor: 'rgb(18, 78, 120)',
        borderColor: 'rgb(18, 78, 120)',
        data: labelDataEdad,
    }]
    };

    const config = {
    type: 'line',
    data: data,
    options: {

    }
    };

    const myChart = new Chart(
    document.getElementById('myChart4'),
    config
    );
}
chartEdad();

async function chartGenero(){

    await getData();

    const data = {
    labels: labelGenero,
    datasets: [{
        label: 'Casos por género ',
        backgroundColor:['rgb(18, 78, 120)','rgb(249, 110, 70)'], 
        borderColor: ['rgb(18, 78, 120)','rgb(249, 110, 70)'],
        data: labelDataGenero,
    }]
    };

    const config = {
    type: 'doughnut',
    data: data,
    options: {

    }
    };

    const myChart = new Chart(
    document.getElementById('myChart5'),
    config
    );
}
chartGenero();

async function chartEstados(){

    await getData();

    const data = {
    labels: labelEstados,
    datasets: [{
        label: 'Casos por estados',
        backgroundColor: 'rgb(249, 110, 70)',
        borderColor: 'rgb(249, 110, 70)',
        data: labelDataEstados,
    }]
    };

    const config = {
    type: 'line',
    data: data,
    options: {

    }
    };

    const myChart = new Chart(
    document.getElementById('myChart6'),
    config
    );
}
chartEstados();

async function getData() {
    const apiUrl = "https://covid19.patria.org.ve/api/v1/timeline" //api gob de Venezuela

    const response = await fetch(apiUrl);
    const barChatData = await response.json();

    //datos de los 31 últimos días
    const date = barChatData.map((data) => data.Date);
    const ultimosDias = date.slice(-31);
    labelultimosDias = ultimosDias;

    //datos de las cifras de casos activos de los últimos 31 días
    const activos = barChatData.map((data) => data.Active.Count);
    const ultimosActivos = activos.slice(-31);
    labelUltimosActivos = ultimosActivos;

    //datos de las cifras de casos nuevos de los últimos 31 días
    const nuevos = barChatData.map((data) => data.Confirmed.New);
    const ultimosNuevos = nuevos.slice(-31);
    labelUltimosNuevos = ultimosNuevos;

    //datos de las cifras de los fallecidos de los últimos 31 días
    const muertes = barChatData.map((data) => data.Deaths.New);
    const ultimosMuertes = muertes.slice(-31);
    labelUltimosMuertes = ultimosMuertes;

    //datos de las cifras de los casos recuperados de los últimos 31 días
    const recuperados = barChatData.map((data) => data.Recovered.New);
    const ultimosRecuperados = recuperados.slice(-31);
    labelUltimosRecuperados = ultimosRecuperados;

    //Segunda Api
    const apiUrl2 = "https://covid19.patria.org.ve/api/v1/summary" //api gob de Venezuela
    const response2 = await fetch(apiUrl2);
    const barChatData2 = await response2.json();

    const totalesArray = [];
    //data del total de confirmados
    const confirmadosTotal = barChatData2.Confirmed.Count;

    //data del total de recuperados
    const recuperadosTotal = barChatData2.Recovered.Count;

    //data del total de muertes
    const muertosTotal = barChatData2.Deaths.Count;

    //data del total de casos activos
    const activosTotal = barChatData2.Active.Count;

    totalesArray.push(confirmadosTotal, recuperadosTotal, muertosTotal, activosTotal);
    labelTotales = totalesArray;

    //data del total de casos por ciudad
    const estados = barChatData2.Confirmed.ByState;
    const estadosArray = Object.keys(estados);
    const dataEstadosArray = Object.values(estados);
    labelEstados = estadosArray;
    labelDataEstados = dataEstadosArray;

    //data del total de casos por genero
    const genero = barChatData2.Confirmed.ByGender;
    const generoArray = Object.keys(genero);
    const dataGeneroArray = Object.values(genero);
    labelGenero = generoArray;
    labelDataGenero = dataGeneroArray;

    //data del total de casos por edad
    const edad = barChatData2.Confirmed.ByAgeRange;            
    const edadArray = Object.keys(edad);
    const dataEdadArray = Object.values(edad);
    labelEdad = edadArray;
    labelDataEdad = dataEdadArray;

}


