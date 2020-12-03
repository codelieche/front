var routes = [
    {
        path: "",
        name: "AntvHome",
        component: () => import("./home.vue")
    },
    // {
    //     path: "001",
    //     name: "Slot001Page",
    //     component: () => import("./001.vue")
    // },
]

var subComponents = ['001', '002', '003', 'customNode/001']

subComponents.forEach(item => {
    routes.push({
        path: item,
        component: () => import(`./${item}.vue`)
    })
})

export default routes