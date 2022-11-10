import { useState } from "react";
import Select from "react-select";

import axios from "axios";

function Sessoes () {
    const [idSessaoVotada, setIdSessaoVotada] = useState(0)
    const [voto, setVoto] = useState(null)
    const [votado, setVotado] = useState(false)
    const tdSessoes = []
    var sessaoSelecionada
    var sessaoVotada

    async function getSessoes (){
        const response = await axios.get(`http://localhost:3333/sessoes`)
        .catch((e) => {
            console.log(e)
        })
        tdSessoes.push(response.data)
        return response.data
        }
    const opcoes = []

    const opSessoes = async() => {
        var sessoes = await getSessoes()
        var qtdSessoes = sessoes.length

        for(let i = 1; i <= qtdSessoes; i++){
            var sessao = sessoes[i-1]
            var novaOpcao = { value: sessao.id, label: sessao.nomeSessao}
            opcoes.push(novaOpcao)
        }
    }

    const opVoto = [
        { value: true, label: 'Á FAVOR' },
        { value: false, label: 'CONTRA' },
        ]

    opSessoes()

    const handleChangeSessao = e => {
            setIdSessaoVotada(e.value);
        }
    const handleChangeVoto = e => {
        setVoto(e.value)
    }

    const getSessaoVotada = async() => {
        const response = await axios.get(`http://localhost:3333/sessoes/${idSessaoVotada}`)
        sessaoSelecionada = response.data
    }

    const valorVoto = async() => {
        await getSessaoVotada()
        const votos = {
            favor: voto ? sessaoSelecionada.votosFavor + 1 : sessaoSelecionada.votosFavor,
            contra: !voto ? sessaoSelecionada.votosContra + 1 : sessaoSelecionada.votosContra
        }

        return votos
    }

    const putVotos = async () => {
        await getSessaoVotada()

        var votos = await valorVoto()

        const response = await axios.put(`http://localhost:3333/sessoes`, {
        id: Number(idSessaoVotada),
        votosFavor: votos.favor,
        votosContra: votos.contra
        })

        setVotado(true)
        sessaoVotada = response.data
        console.log(sessaoVotada)
    }
    

    return (
        <div>
            <div>
                <Select
                value={opcoes.filter(obj => obj.value === idSessaoVotada)}
                options={opcoes}
                placeholder="Selecione a Sessao"
                onChange={handleChangeSessao}
                />
                <Select
                value={opVoto.filter(obj => obj.value === voto)}
                options={opVoto}
                placeholder="Selecione seu Voto"
                onChange={handleChangeVoto}
                />
            </div>

            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    putVotos();
                }}>VOTAR</button>
            </div>
            <div>
                {votado ?
                    <div>
                        <div>
                            <h1>VOTOS FAVORAVEIS =</h1>
                            <h1>{sessaoVotada.votosFavor}</h1>
                        </div>
                        <div>
                            <h1>VOTOS CONTRA =</h1>
                            <h1>{sessaoVotada.votosContra}</h1>
                        </div>
                    </div>
                : null}
            </div>
        </div>

    )
}


export default Sessoes;