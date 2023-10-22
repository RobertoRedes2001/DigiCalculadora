function calcularDmgAtributo(atkAtacante,atributoAtacante, atributoDefensor) {
    //Superioridad de cada atributo contra otro
    let bonos = {
        'virus': { 'vacuna': -0.5, 'data': -0.5 },
        'vacuna': { 'virus': 0.5, 'data': -0.5 },
        'data': { 'virus': -0.5, 'vacuna': 0.5 }
    };

    //Calculamos si el ataque hace menos o más daño por su atributo
    //en caso de que no haya coincidencia retornamos bono 0.
    if (bonos[atributoAtacante] && bonos[atributoAtacante][atributoDefensor]) {
        return Math.round(atkAtacante * bonos[atributoAtacante][atributoDefensor]);
    }else{
        return 0;
    }
    
}

function calcularDmgTipo(atkAtacante, tipoAtaque, tipoDefensor) {
    //Superioridad de cada tipo contra otro
    let bonos = {
        'fuego': { 'agua': -0.5, 'planta': 0.5 },
        'agua': { 'planta': -0.5, 'fuego': 0.5 },
        'planta': { 'fuego': -0.5, 'agua': 0.5 },
        'tierra': { 'viento': -0.5, 'electrico': 0.5 },
        'electrico': { 'tierra': -0.5, 'viento': 0.5 },
        'viento': { 'electrico': -0.5, 'tierra': 0.5 },
        'luz' : {'oscuridad' : 0.5},
        'oscuridad' : {'luz' : 0.5},
    };
    //Calculamos si el ataque hace menos o más daño por su tipo, 
    //en caso de que no haya coincidencia retornamos bono 0.
    if (bonos[tipoAtaque] && bonos[tipoAtaque][tipoDefensor]) {
        return Math.round(atkAtacante * bonos[tipoAtaque][tipoDefensor]); 
    }else{
        return 0;
    }
}

function calcularDmgAtk(atkAtacante,dadoatk,bonoTipo,bonoAtributo,bonoatk,criticoDaño,buff,debuff){
    
    //Comprobamos las condicionales para saber si el daño aumenta o se reduce
    buff ? atkAtacante = atkAtacante*1.25 : atkAtacante;
    debuff ? atkAtacante = atkAtacante-(atkAtacante*0.25) : atkAtacante;
    criticoDaño ? dadoatk = dadoatk * 1.5 : dadoatk;
    //Sumamos el ATK con la potenciacion por Atributo y Tipo
    let atacanteBuff = atkAtacante+bonoTipo+bonoAtributo;
    //Retornamos la suma del stat de ATK con la tirada de dado y el bono
    return Math.round(atacanteBuff + dadoatk + bonoatk);
}

function calcularDmgDef(defDefensor,bonodef,buff,debuff){
    //Comprobamos las condicionales para saber si la defensa es mayor o menor
    buff ? defDefensor = defDefensor*1.25 : defDefensor;
    debuff ? defDefensor = defDefensor-(defDefensor*0.25) : defDefensor;
    //Retornamos la suma del stat de DEF con el bono
    return Math.round(defDefensor + bonodef);
}

function calcularTotalDmg(ataque,defensa,criticoPrecision,cubrirse, boost){
    let dañoTotal; 
    //Comprobamos las condicionales para saber si el daño se dobla o mitiga por la defensa
    //Y retornamos el daño total
    boost ? dañoTotal = (ataque*2) - defensa : dañoTotal = ataque - defensa;
    cubrirse ? dañoTotal = dañoTotal - (dañoTotal*0.5) : dañoTotal;
    if(criticoPrecision){
        return Math.round(dañoTotal*1.5);
    }else{
        return Math.round(dañoTotal);
    }
}

// Encapsula los elementos <input> y <input type="checkbox> del grupo ATK
let atkInput = document.getElementById('atk');
let bonoATKInput = document.getElementById('bonoATK');
let tiposSelectATK = document.getElementById('tipoATK');
let atributosSelectATK = document.getElementById('atributoATK');
let chargeATKCheckbox = document.getElementById('chargeATK');
let breakATKCheckbox = document.getElementById('breakATK');
let boostCheckbox = document.getElementById('boost');

// Encapsula los elementos <input> y <input type="checkbox> del grupo DEF
let defInput = document.getElementById('def');
let bonoDEFInput = document.getElementById('bonoDEF');
let tiposSelectDEF = document.getElementById('tipoDEF');
let atributosSelectDEF = document.getElementById('atributoDEF');
let chargeDEFCheckbox = document.getElementById('chargeDEF');
let breakDEFCheckbox = document.getElementById('breakDEF');
let guardCheckbox = document.getElementById('guard');

// Encapsula los elementos <input> y <input type="checkbox> del grupo DADOS
let dadoInput = document.getElementById('dado');
let critDMGCheckbox = document.getElementById('criDMG');
let critSPDCheckbox = document.getElementById('critSPD');

//Cargamos las listas de atributos y tipos
document.addEventListener('DOMContentLoaded', function () {
  
    let selectType1 = document.getElementById('tipoATK');
    let selectAtribute1 = document.getElementById('atributoATK');
    let selectType2 = document.getElementById('tipoDEF');
    let selectAtribute2 = document.getElementById('atributoDEF');

    // Array de tipos
    let tipos = ['fuego', 'agua', 'planta', 'tierra', 'electrico', 'viento', 'luz', 'oscuridad', 'neutral'];

    // Array de atributos
    let atributos = ['vacuna', 'data', 'virus', 'free'];

    // Función para agregar opciones a un elemento <select>
    function agregarOpcionesASelect(select, opciones) {
        opciones.forEach(function (opcion) {
            let option = document.createElement('option');
            option.text = opcion;
            select.add(option);
        });
    }

    // Agregar opciones a los elementos <select>
    agregarOpcionesASelect(selectType1, tipos);
    agregarOpcionesASelect(selectAtribute1, atributos);
    agregarOpcionesASelect(selectType2, tipos);
    agregarOpcionesASelect(selectAtribute2, atributos);
});

document.getElementsByTagName("button")[0].addEventListener("click",function(){
    
    let tipo = calcularDmgTipo(parseInt(atkInput.value),tiposSelectATK.value,tiposSelectDEF.value);
    let atributo = calcularDmgAtributo(parseInt(atkInput.value),atributosSelectATK.value,atributosSelectDEF.value);
    let totalATK = calcularDmgAtk(parseInt(atkInput.value),parseInt(dadoInput.value),tipo,atributo,
    parseInt(bonoATKInput.value),critDMGCheckbox.checked,chargeATKCheckbox.checked,breakATKCheckbox.checked);

    let totalDEF = calcularDmgDef(parseInt(defInput.value),parseInt(bonoDEFInput.value),chargeDEFCheckbox.checked,breakDEFCheckbox.checked);
    let calculoFinal = calcularTotalDmg(totalATK,totalDEF,critSPDCheckbox.checked,guardCheckbox.checked,boostCheckbox.checked);

    document.getElementsByTagName("td")[0].textContent = totalATK;
    document.getElementsByTagName("td")[2].textContent = totalDEF;
    document.getElementsByTagName("td")[4].textContent = calculoFinal;
})









