import React, {useState} from 'react';
import Majax from 'react-mathjax';
import {changeValue,containsErrorValue, setErrorValue } from './../../common/example';
import {CardText, Row, Col,Input,Card,CardBody,Button,Alert} from 'reactstrap';



const Example=()=> {

    
    const [isError, setIsError] = useState(false);
    //PГ
    const [p_g, setP_g] = useState(0);
    const [p_gInpt, setP_gInpt] = useState(0);
    //l
    const [l, setL] = useState(0);
    const [lInpt, setLInpt] = useState(0);
    //Uф
    const [uf, setUf] = useState(0);
    const [ufInpt, setUfInpt] = useState(0);
    //Схема соединения
    //A
    const [a,setAConnect]=useState(0);
    const [aInput, setAInput]=useState(0);
    //B
    const [b,setBConnect]=useState(0);
    const [bInput, setBInput] = useState(0);
    //PГ<
    const [p_g_eq, setP_g_eq] = useState(0);
    const [p_g_eqInpt, setP_g_eqInpt] = useState(0);
    //Тип линии: 
    const [xn_e, setLineXn_e] = useState(0);
    const [xn_eInpt, setXn_eInpt] = useState(0);
    //Материал провода: 
    const [ro, setRo] = useState(0);
    const [roInpt, setRoInpt] = useState(0);
    //Kг
    const [k_g, setK_g] = useState(0);
    const [k_gInpt, setK_gInpt] = useState(0);
    //New value 
    const [p1, setP1] = useState(0);
    const [Xf,setXf] = useState(0);
    const [In, setIn] = useState(0);
    const [Ikz, setIkz] = useState(0);
    const [Sf, setSf] = useState(0);
    const [Snz, setSnz] = useState(0);
    const [Rf, setRf] = useState(0);
    const [Rnz, setRnz] = useState(0);
    const [Zt, setZt] = useState(0);
    const [Xn, setXn] = useState(0);
    const [Zn, setZn] = useState(0);
    const [Ikef,setIkef] = useState(0);
    const [alpha,set_alpha] = useState(0);
    const [Xnz,setXnz] = useState(0);

    const textStyle = {
        textIndent: "20px"
    };
    const inputStyle={
        width:"80px",
        height:"30px",
        display:"inline",
    };
    const selectStyle={
        width:"200px",
        height:"35px",
        display:"inline",
    }


    const resolve = () => {
        setIsError(false)

        
        setP_g(p_gInpt);
        setL(lInpt);
        setUf(ufInpt);
        setP_g_eq(p_g_eqInpt); 
        setAConnect(aInput);
        setBConnect(bInput);
        setRo(roInpt);
        setK_g(k_gInpt);
        setLineXn_e(xn_eInpt)

        let res_p1=p_gInpt/3;
        setP1(res_p1.toFixed(2));


        {
            let res_Xf=0.0152;
            setXf(res_Xf.toFixed(2));
            let res_Xnz=0.0152;
            setXnz(res_Xnz.toFixed(2));  
        }

        let res_In = (Math.pow(10, 3)*p1/uf);
        setIn(res_In.toFixed(2));

        let res_Ikz = k_g*In;
        setIkz(res_Ikz.toFixed(2));

        let res_Sf=In/k_g;
        setSf(res_Sf.toFixed(2));

        let res_Snz=Sf/2;
        setSnz(res_Snz.toFixed(2));

        let res_Rf=Math.pow(10,6)*Math.pow(10,-8)*ro*l/Sf;
        setRf(res_Rf.toFixed(2));

        let res_Rnz=Math.pow(10,6)*ro*Math.pow(10,-8)*l/Snz;
        setRnz(res_Rnz.toFixed(2));

        let res_alpha=Math.pow((uf/230),2);
        set_alpha(res_alpha.toFixed(2));
       
        let res_Zt=a*alpha/(p_g+b);
        setZt(res_Zt.toFixed(2));

        let res_Xn=xn_e*l*Math.pow(10,-3);
        setXn(res_Xn.toFixed(2));
        
        let res_Zn=Math.sqrt(Math.pow((Rf+Rnz),2)+Math.pow((Xf+Xnz+Xn),2));
        setZn(res_Zn.toFixed(2));

        let res_Ikef=uf/(Zt/3+Zn);
        setIkef(res_Ikef.toFixed(2));
       
        
        console.log(
            "PГ:",p_gInpt,
            "L:",lInpt,
            "Uф",ufInpt,
            "a",aInput,
            "b",bInput,
            "PГ",p_g_eq, 
            "ro",ro,
            "k_g",k_g);
        
        if(containsErrorValue(res_Ikef)){
            setIsError(true);
            setErrorValue(res_Ikef);
            return;
        }
        


     
    }

    return (
        <Majax.Provider>
        <Row className="justify-content-center">
        <Col lg="9">
        <Card className="mt-3">
        <CardBody >
           <CardText className={textStyle}>
            <br/>Исходные данные
            <br/>1. Габаритная мощность <Majax.Node inline formula="P_{Г}= "/> <Input style={inputStyle} onChange={e=>setP_gInpt(changeValue(e))}/> <Majax.Node inline formula="кВА"/>
            <br/>2. Длина сети: <Majax.Node inline formula="l="/>  <Input style={inputStyle} onChange={e=>setLInpt(changeValue(e))}/> <Majax.Node inline formula="м"/>
            <br/>3. Фазное напряжение <Majax.Node inline formula="U_{ф}="/> <Input style={inputStyle} onChange={e=>setUfInpt(changeValue(e))}/> <Majax.Node inline formula="В"/>
            <br/>4. Схема соединения: 
                <Input className="custom-select" type="select" style={selectStyle} onChange={(e)=>{
                    const select_a=e.target.value1;
                    const select_b=e.target.value2;
                    setAInput(changeValue(select_a));
                    setBInput(changeValue(select_b));
                }}>                
                    <option value1="77.95" value2="0.0648">треугольник-звезда</option>
                    <option value1="22.54" value2="-0.1176">звезда-звезда</option>   
                </Input>
            <br/>5. Вид защиты: автомат защиты при <Majax.Node inline formula="P_{Г}<"/> <Input style={inputStyle} onChange={e=>setP_g_eqInpt(changeValue(e))}/> <Majax.Node inline formula="кВА"/>
            <br/>6. Тип линии: <Input Input className="custom-select" type="select" style={selectStyle} nChange={(e)=>{
                    const select_line=e.target.value
                    setXn_eInpt(changeValue(select_line));
                }}>
                    <option value="0.4">воздушная линии</option>
                    <option value="0.07">кабельная линия</option>
                </Input>
            <br/>7. Материал провода: <Majax.Node inline formula="ρ="/> <Input Input style={inputStyle} onChange={e=>setRoInpt(changeValue(e))}/> <Majax.Node inline formula="А/мм^{2}"/>
            <br/>8. Допустимая плотность тока: <Majax.Node inline formula="K_{г}="/> <Input style={inputStyle} onChange={e=>setK_gInpt(changeValue(e))}/> <Majax.Node inline formula="А/мм^{2}"/>
            </CardText>
            <CardText>
                <Button onClick={resolve}>Рассчитать</Button>
            </CardText>
            <CardText>
                Расчет:
            </CardText>
            <CardText>
            1. Габаритная мощность на одну фазу:
            </CardText>
            <CardText className="text-center">
                <Majax.Node inline formula={`P_{1}=P_{Г}/3 = ${p_g}/3 = ${p1}кВ·A`} />
            </CardText>
            <CardText>
            2. Номинальный ток нагрузки на одну фазу:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula={`I_{н}=P_{1}/U_{ф}= 1·10^{3}·${p1}/${uf} = ${In}A`}/>
            </CardText>
            <CardText>
            3. Минимальное требующееся значение тока:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula="I_{кз}≥k·I_{н}= 1.4·19.30 = 27.02A"/>
            </CardText>
            <CardText>
            4. Требующееся значение сечения фазного провода:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula={`S_{ф}=I_{н}/K_{г}= ${In}/${k_g} = ${Sf}мм^{2}`}/>
            </CardText>
            <CardText>
            5. Требующееся значение сечения нулевого защитного провода:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula={`S_{нз}=S_{ф}/2 = ${Sf}/2 = ${Snz}мм^{2}`}/>
            </CardText>
            <CardText>
            6. Активное сопротивление фазного провода:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula={`R_{ф}=ρ·l/S_{ф}= 10^{6}·${ro}·10^{−8}·${l}/${Sf} = ${Rf}Ом`}/>
            </CardText>
            <CardText>
            7. Активное сопротивление нулевого защитного провода:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula={`R_{нз}=ρ·l/S_{нз}= 10^{6}·${ro}·10^{−8}·${l}/${Snz}= ${Rnz}Ом`}/>
            </CardText>
            <CardText>
            8. Вычислим значение  <Majax.Node inline formula="Z_{Т}"/>:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula="Z_{Т}=A·α/(P_{Г}+B) = 22.54·2.73/(22−0.1176) = 2.81 Ом"/>
            </CardText>
            <CardText>
            9. Вычислим значение  <Majax.Node inline formula="X_{п}"/>:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula="X_{п}=X^{′}_{п}·l·1·10^{−3}=0.4·950·1·10^{−3}=3.80·10^{−1}Ом/км"/>
            </CardText>
            <CardText>
            10. Вычислим значение <Majax.Node inline formula="Z_{п}"/>:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula="Z_{п}=\sqrt{(R_{ф}+R_{нз})^{2}+(X_{ф}+X_{нз}+X_{п})^{2}}=\sqrt{(1.29 + 2.58)^{2}+(1.52·10−2+1.52·10−2+3.80·10−1)^{2}}=3.90Ом"/>
            </CardText>
            <CardText>
            11. Вычислим <Majax.Node inline formula="I_{кэф}"/>:
            </CardText>
            <CardText className="text-center">
            <Majax.Node inline formula="I_{кэф}=U_{ф}/(Z_{Т}/3+Z_{п}) = 380/(2.81/3 + 3.90) = 78.58A"/>
            </CardText>
            <CardText>
            12. <Majax.Node inline formula="I_{кэф} > I_{кз}→"/> Расчет окончен
            </CardText>
            <CardText>
                <Alert className="mt-3" color="danger" isOpen={isError}>Невозможно посчитать</Alert>
                <Majax.Node inline formula={`${Xf}`}/>
            </CardText>
        </CardBody>
        </Card>
        </Col>
        </Row>
        </Majax.Provider>
    );
}

export default Example;