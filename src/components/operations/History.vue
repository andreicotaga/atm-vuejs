<template>
    <div class="transactions">
        <h3>Transactions history</h3>
        <div class="transactions__content" v-if="totalRows > 0">
            <b-form-group horizontal label="Per page" class="mb-0">
                <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
            <b-table
                    responsive
                    :fields="fields"
                    :items="transactions"
                    v-model="transactions"
                    :current-page="currentPage"
                    :per-page="perPage"
            >
                <template slot="Nr." slot-scope="data">
                    {{data.index + 1}}
                </template>
                <template slot="created_at" slot-scope="data">
                    {{data.item.created_at}}
                </template>
            </b-table>
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
        </div>
        <div class="transactions_empty" v-if="totalRows === 0">
            There is no data to show.
        </div>
    </div>

</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "History",
        data: function() {
            return {
                fields:
                    [
                        'Nr.',
                        { key: 'amount', label: 'Amount', sortable: true },
                        { key: 'created_at', label: 'Date', sortable: true },
                        { key: 'oper_code', label: 'Operation type', sortable: true },
                        { key: 'comment', label: 'Comment', sortable: true },
                    ],
                currentPage: 1,
                perPage: 5,
                pageOptions: [ 5, 10, 15 ],
                totalRows: this.$store.state.transactions.length,
            }
        },
        mounted() {
            this.getData();
        },
        computed: {
            ...mapState(['transactions'])
        },
        methods: {
            getData() {
                this.$store.dispatch('transactions')
            }
        }
    }
</script>

<style scoped>

</style>