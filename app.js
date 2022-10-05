let form = document.getElementById('cadastro');

let storage = [];

//Método do formulario, para pegar os dados
form.addEventListener('submit', function () {
    let storage = (localStorage.ALUNO) ? JSON.parse(localStorage.ALUNO) : [];

    let nome = document.querySelector('#nome').value;
    let nota1 = parseFloat(document.querySelector('#nota1').value);
    let nota2 = parseFloat(document.querySelector('#nota2').value);
    let nota3 = parseFloat(document.querySelector('#nota3').value);
    let media = (nota1 + nota2 + nota3) / 3;
    

    let aluno = {
        "nome": nome,
        "nota1": nota1,
        "nota2": nota2,
        "nota3": nota3,
        "media": media
    }

    let botaoSubmit = document.querySelector('#submit').value;

    if(!botaoSubmit){

        storage.push(aluno);

        msgSucesso = 'Cadastro efetuado com sucesso!';
    }else{
        let idRegistro = document.querySelector('#idRegistro').value;
        storage[idRegistro] = aluno;

        msgSucesso = 'Cadastro editado com sucesso!';
    }

    localStorage.setItem('ALUNO', JSON.stringify(storage));

    alert(msgSucesso);
    form.reset();
    listarDados();
    document.querySelector('#submit').value = '';
})

//Metodo para listagem na tabela
function listarDados(){
    if(localStorage.ALUNO){
        let dados = JSON.parse(localStorage.ALUNO) ? JSON.parse(localStorage.ALUNO) : [];
        let tabela = '';

        for (const i in dados){
            tabela += `
            <tr>
                <td>${dados[i].nome}</td>
                <td>${dados[i].nota1},${dados[i].nota2},${dados[i].nota3}</td>
                <td>${dados[i].media.toFixed(2)}</td>
                <td>${dados[i].media > 7 ? "Passou" : "Reprovou" }</td>
                <td><a href="#" onclick="editarItem(${i})">Editar</a></td>
                <td><a href="#" onclick="deletaItem(${i})">Delete</a></td>
            </tr>`;
        }

        document.querySelector('table tbody').innerHTML = tabela;
    }else{
        let tabela= `
        <tr>
        <td colspan="6" align="center">Não existem dados</td>
        </tr>`;

        document.querySelector('table tbody').innerHTML = tabela;
    }
}

//Método para deletar
function deletaItem(id){
    let dados = JSON.parse(localStorage.ALUNO) ? JSON.parse(localStorage.ALUNO) : [];
    dados.splice(id, 1);
    if(dados.length > 0){
        localStorage.setItem('ALUNO', JSON.stringify(dados));
    }else{
        localStorage.setItem('ALUNO', '');
    }
    listarDados()
    return false;
}

//Métoto para edição
function editarItem(id){
    let dados = JSON.parse(localStorage.ALUNO) ? JSON.parse(localStorage.ALUNO) : [];
    let dadoSelecionado = dados[id];

    document.querySelector('#nome').value = dadoSelecionado.nome;
    document.querySelector('#nota1').value = dadoSelecionado.nota1;
    document.querySelector('#nota2').value = dadoSelecionado.nota2;
    document.querySelector('#nota3').value = dadoSelecionado.nota3;

    document.querySelector('#submit').value = 'editar';

    document.querySelector('#idRegistro').value = id;
}

listarDados();