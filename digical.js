function calcularDmgAtributo(atributoAtacante, atributoDefensor) {
    //Superioridad de cada atributo contra otro
    let bonos = {
        'virus': { 'vacuna': -0.5, 'data': -0.5 },
        'vacuna': { 'virus': 0.5, 'data': -0.5 },
        'data': { 'virus': -0.5, 'vacuna': 0.5 }
    };

    //Calculamos si el ataque hace menos o más daño por su atributo
    //en caso de que no haya coincidencia retornamos bono 0.
    if (bonos[atributoAtacante] && bonos[atributoAtacante][atributoDefensor]) {
        return Math.round(atributoAtacante * bonos[atributoAtacante][atributoDefensor]);
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
    return Math.round(def + bonodef);
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

let tipos = [
    'fuego','agua','planta','tierra','electrico','viento', 'luz', 'oscuridad'
];






