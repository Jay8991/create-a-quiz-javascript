const xhr = new XMLHttpRequest();

xhr.onload = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        // console.log(data)
        output_questions(data)
        // will need to output the score at the end
        let correct_answers_output = document.createElement('h3')
        quiz_submit.addEventListener('submit', function(event){
            event.preventDefault()
            // clear it first
            correct_answers.innerText = ''
            // console.log(event.target[0].value)
            let correct = 0
            // loop to see which one matches correct answer then change color depending on that
            for(const [key, value] of Object.entries(data[1])){
                if(event.target[key-1].value == value){
                    // console.log(key, value)
                    // change color to greenish color 
                    document.querySelector(`#question${key}`).style.backgroundColor = "#b3ffb3"
                    // increment the correct by 1
                    correct++
                }else{
                    // change color to redish color
                    document.querySelector(`#question${key}`).style.backgroundColor = "#ff8080"
                }
            }
            // console.log(correct)
            // display score after the loop
            correct_answers_output.classList.add('mt-5')
            correct_answers_output.classList.add('ml-5')
            correct_answers_output.innerText  = `You got ${correct}/10 right`
            correct_answers.appendChild(correct_answers_output)
        })
    }
}
xhr.open('GET', '/static/data.json');
xhr.send()

function output_questions(data){
    // data at index 0 has all the questions to loop over that and display the questions
    for(const [key, value] of Object.entries(data[0])){
        // create new question div for all the questions
        let question_div = document.createElement('div')
        // style the div 
        question_div.classList.add('m-5')
        question_div.classList.add('border')
        question_div.classList.add('p-5')
        question_div.id = `question${key}`
        // console.log(question_div)
        // create heading
        let question_heading = document.createElement('h2')
        question_heading.innerText = `Question ${key}`
        // question 
        let question = document.createElement('p')
        question.innerText = `${value}`
        // input field for the question
        let i = document.createElement('input')
        i.type = 'text'
        i.className = 'input_field' // change the style in main.css
        // append all to question div
        question_div.appendChild(question_heading)
        question_div.appendChild(question)
        question_div.appendChild(i)
        // finally append it to actual div
        quiz_submit.appendChild(question_div)
    }
    // submit button
    let turnIn = document.createElement('input')
    turnIn.type = 'submit'
    turnIn.classList.add('btn')
    turnIn.classList.add('btn-info')
    turnIn.classList.add('btn-lg')
    turnIn.classList.add('mb-5')
    // add it to form
    quiz_submit.appendChild(turnIn)
}