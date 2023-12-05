import { reactive, ref, onMounted, watch } from 'vue'
import { useStore } from "vuex"
import { useRoute, useRouter } from 'vue-router'
import { getGameList, getCollectionGame } from '@/apis/game'

export default function () {
    const route = useRoute()
    const router = useRouter()
    const { state } = useStore()
    onMounted(() => {
        window_width.value = window.innerWidth
        if (state.permission.user_device != 'h5') pc_width.value = document.getElementsByClassName("game-list")[0].offsetWidth
        initData()
    })
    watch(
        () => route.query,
        () => {
            companyName.value = ''
            categoryName.value = ''
            gameList.data = []
            pageInfos.hasNext = 0
            pageInfos.totalEntities = 0
            params.pageNum = 1
            params.pageSize = 18
            params.gameCategoryId = ""
            params.gameCompanyId = ""
            params.isHot = ""
            params.isRecommend = ""
            cur_provider.name = 'ALL'
            cur_provider.companyId = ''
            cur_catogory.name = 'ALL'
            cur_catogory.categoryId = ''
            provider_show.value = false
            category_show.value = false
            initData()
        }
    )
    const initData = () => {
        if (route.query.categoryName) {
            categoryName.value = route.query.categoryName
            if (categoryName.value != 'Recommend' && categoryName.value != 'Hot' && categoryName.value != 'New' && categoryName.value != 'Collection' && categoryName.value != 'Recent')
                cur_catogory.name = route.query.categoryName
            if (categoryName.value == 'Recommend') params.isRecommend = 1
            if (categoryName.value == 'Hot') params.isHot = 1
        }
        if (route.query.categoryId) {
            params.gameCategoryId = route.query.categoryId
            cur_catogory.id = route.query.categoryId
        }
        if (route.query.companyName) {
            companyName.value = route.query.companyName
            cur_provider.name = route.query.companyName
        }
        if (route.query.companyId) {
            params.gameCompanyId = route.query.companyId
            cur_provider.id = route.query.companyId
        }
        getList()
    }
    const window_width = ref(0)
    const companyName = ref('')
    const categoryName = ref('')
    const pc_width = ref(0)
    const showLoading = ref(false)
    const gameList = reactive({
        data: []
    })
    const pageInfos = reactive({
        totalEntities: 0,
        hasNext: 0
    })

    const provider_show = ref(false)
    const category_show = ref(false)
    const providers = [
        {
            name: 'PG',
            count: '98',
            companyId: 27
        },
        {
            name: 'PRAGMATIC PLAY',
            count: '280',
            companyId: 26
        },
        // {
        //     name: 'FC',
        //     count: '16',
        //     companyId: 28
        // },
        // {
        //     name: 'JILI',
        //     count: '5',
        //     companyId: 29
        // }
    ]
    const categories = [{
        name: 'Sports',
        count: '2',
        categoryId: 6
    }, {
        name: 'Slots',
        count: '99',
        categoryId: 3,
    }, {
        name: 'Live Casino',
        count: '10',
        categoryId: 4,
    }]
    const cur_provider = reactive({
        name: 'All',
        companyId: ''
    })
    const cur_catogory = reactive({
        name: 'All',
        categoryId: ''
    })

    const params = reactive({
        pageNum: 1,
        pageSize: 18,
        gameCategoryId: "",
        gameCompanyId: "",
        isHot: "",
        isRecommend: ""
    })

    const getList = () => {
        showLoading.value = true
        if (categoryName.value != 'Collection' && categoryName.value != 'Recent') {
            getGameList.post("", { ...params })
                .then(res => {
                    showLoading.value = false
                    if (res.code == "000000") {
                        pageInfos.totalEntities = res.data.total
                        pageInfos.hasNext = res.data.hasNextPage ? 1 : 0
                        gameList.data = gameList.data.concat(res.data.list)
                    }
                }).catch(err => {
                    showLoading.value = false
                })
        } else {
            getCollectionGame.post("", {
                ...params,
                way: categoryName.value == 'Collection' ? 'C' : 'N'
            }).then(res => {
                showLoading.value = false
                if (res.code == "000000") {
                    pageInfos.totalEntities = res.data.data.total
                    pageInfos.hasNext = res.data.data.hasNextPage ? 1 : 0
                    gameList.data = gameList.data.concat(res.data.data.list)
                }
            }).catch(err => {
                showLoading.value = false
            })
        }
    }

    const loadMore = () => {
        params.pageNum = params.pageNum + 1
        getList()
    }

    const loadCompanyGame = (data) => {
        provider_show.value = false
        category_show.value = false
        companyName.value = data.name
        cur_provider.name = data.name
        cur_provider.id = data.companyId
        params.pageNum = 1
        params.gameCompanyId = data.companyId
        params.isHot = ""
        params.isRecommend = ""
        gameList.data = []
        getList()
    }

    const loadCategoryGame = (data) => {
        provider_show.value = false
        category_show.value = false
        categoryName.value = data.name
        cur_catogory.name = data.name
        cur_catogory.id = data.categoryId
        params.pageNum = 1
        params.gameCategoryId = data.categoryId
        params.isHot = ""
        params.isRecommend = ""
        gameList.data = []
        getList()
    }

    const openProvider = () => {
        if (category_show.value) category_show.value = false
        provider_show.value = !provider_show.value
    }
    const openCategory = () => {
        if (provider_show.value) provider_show.value = false
        category_show.value = !category_show.value
    }

    const goBack = () => {
        router.go(-1)
    }

    return {
        window_width,
        pc_width,
        companyName,
        categoryName,
        showLoading,
        gameList,
        pageInfos,
        provider_show,
        category_show,
        providers,
        categories,
        cur_provider,
        cur_catogory,
        openProvider,
        openCategory,
        goBack,
        loadMore,
        loadCompanyGame,
        loadCategoryGame
    }
}