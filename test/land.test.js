const Land = artifacts.require("./Land")

require('chai')
    .use(require('chai-as-promised'))
    .should()

const EVM_REVERT = "VM Revert"

contract("Land", ([owner1, owner2]) => {
    const NAME   = "Metaverse Buildings"    
    const SYMBOL = "DUB"
    const COST   = web3.utils.toWei('1', 'ether')  

    let land, result

    beforeEach( async () => {
        land = await Land.new(NAME,SYMBOL, COST)
    })

    /********** TEST DEPLOYMENT ***********/
    describe("Deployment", () => {
        it("returns the contract name", async () => {
            result = await land.name()
            result.should.equal(NAME)
        })

        it("returns the symbol", async () => {
            result = await land.symbol()
            result.should.equal(SYMBOL)
        })

        it("returns the cost to mint", async () => {
            result = await land.cost()
            result.toString().should.equal(COST)
        })

        it("returns the max supply", async () => {
            result = await land.maxSupply()
            result.toString().should.equal('5')
        })

        it("returns the count of buildings/lans available", async () => {
            result = await land.getBuildings()
            result.length.should.equal(5)
        })
        }
    )

    /********** TEST MINTING ***********/
    describe("Minting", () => {
        describe("Success", () => {
            
            result = land.mint(1, {from: owner1, value: COST})

            it("Updates the owner address", async () => {
                land.ownerOf(1)
                result.should.equal(owner1)
            })

            it("Updates building details", async () => {
                result = land.getBuilding(1)
                result.owner.should.equal(owner1)

            })
        })
        }
    )

/*
    describe("Failure", () => {
        it("prevents mint with 0 value", async () => {
            await land.mint(1, {from: owner1, value: 0}).should.be.rejectedWith(EVM_REVERT)
            
        })

        it("prevents mint with invalid id token", async () => {
            await land.mint(100, {from: owner1, value: COST}).should.be.rejectedWith(EVM_REVERT)
        })

        it("prevents minting if already owned", async () => {
            await land.mint(1, {from: owner1, value: COST})
            await land.mint(1, {from: owner2, value: COST}).should.be.rejectedWith(EVM_REVERT)
        })

    })
    
    describe("Transfers", () => {
        describe("Success", () => {
                beforeEach(async () => {
                    land.mint(1, {from: owner1, value:COST})
                    land.approve(owner2, 1, {from: owner1})
                    land.transferFrom(owner1, owner2, 1, {from: owner2})
                })

                it("Updates the owner address", async () => {
                    result = await land.ownerOf(1)
                    result.owner.should.equal(owner2)
                    
                })

                it("Updates building details", async () => {
                    result = await land.getBuilding(1)
                    result.owner.should.equal(owner2)
                    
                })

            }
        )

        describe("Failure", () => {
            it("prevents transfer without ownership", async () => {
                await land.transferFrom(owner1, owner2, 1, {from: owner2}).should.be.rejectedWith(EVM_REVERT)        
            })
            

        })


    })*/

        
    
})

