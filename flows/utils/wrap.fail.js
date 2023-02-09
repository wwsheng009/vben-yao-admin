function main(input, processResp, last, global) {
    console.log("step:fail")
    console.log("input:", input)
    console.log("processResp:", processResp)
    console.log("last:", last)
    console.log("global:", global)

    return { "code": 100, "result": input, "message": "failed", "type": "fail" }
}