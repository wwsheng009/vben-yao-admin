function main(input, processResp, last, global) {
    console.log("step:done")
    console.log("input:", input)
    console.log("processResp:", processResp)
    console.log("last:", last)
    console.log("global:", global)

    return { "code": 2, "result": input, "message": "done", "type": "success" }
}