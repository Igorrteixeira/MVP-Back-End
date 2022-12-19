import { HashManagerMock } from "./mocks/HashManegerMock"


describe("Teste HashManager", () => {
    test("Deve retornar sucesso se fizer hash do password", async () => {
        const testeHash = await new HashManagerMock().hash("mvptest")
        expect(testeHash).toBe("mvptest-hash")
    })

    test("Deve retornar sucesso se password com hash for encontrado", async () => {
        const testeHash = await new HashManagerMock().compareHash("mvptest", "mvptest-hash")
        expect(testeHash).toBe(true)
    })
})



