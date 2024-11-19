import QuizFetcher from "../../src/data_fetchers/QuizFetcher";

describe('QuizFetcherクラスのテスト',()=>{
    it('10件のクイズデータが手に入る',async()=>{
        const quizData=await QuizFetcher.fetch();

        expect(Array.isArray(quizData.results)).toStrictEqual(true);
        expect(quizData.results.length).toStrictEqual(10);

        quizData.results.forEach(quiz=>{
            expect(typeof quiz.type).toStrictEqual('string');
            expect(typeof quiz.difficulty).toStrictEqual('string');
            expect(typeof quiz.category).toStrictEqual('string');
            expect(typeof quiz.question).toStrictEqual('string');
            expect(typeof quiz.correct_answer).toStrictEqual('string');

            expect(Array.isArray(quiz.incorrect_answers)).toStrictEqual(true);
            expect(quiz.incorrect_answers.length).toStrictEqual(3);
            
            quiz.incorrect_answers.forEach(incorrectAnswer=>{
                expect(typeof incorrectAnswer).toStrictEqual('string');
            });
        });
    });
});