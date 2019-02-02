<template>
    <div class="deposit">
        <h3>Deposit</h3>
        <div class="deposit__content">
            <b-form v-on:submit.prevent="depositAction()">
                <b-form-group id="amountGroup1"
                              label="Enter the amount you want to deposit:"
                              label-for="amountDeposit"
                >
                    <b-form-input id="amountDeposit"
                                  name="Deposit amount"
                                  type="number"
                                  v-model="deposit.amount"
                                  v-validate="'required|decimal|min_value:1'"
                                  placeholder="e.g. 100.00">
                    </b-form-input>
                    <span>{{ errors.first('Deposit amount') }}</span>
                </b-form-group>
                <b-form-group id="commentGroup1"
                              label="Comment:"
                              label-for="comment"
                >
                    <b-form-textarea id="comment"
                                  name="Comment"
                                  v-model="deposit.comment"
                                  v-validate="'required|max:255'"
                                  :rows="3"
                                  :max-rows="6"
                                  placeholder="e.g. Car credit payment..">
                    </b-form-textarea>
                    <span>{{ errors.first('Comment') }}</span>
                    <span class="remote_error" v-if="failed">{{ errorMessage }}</span>
                    <span class="remote_success" v-if="success">{{ successMessage }}</span>
                </b-form-group>
                <b-button :disabled="onWait" type="submit" variant="primary">Deposit</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Deposit',
        data () {
            return {
                deposit: {
                    amount: '',
                    comment: ''
                },
                user: {},
                show: true,
                failed: false,
                success: false,
                errorMessage: '',
                onWait: false
            }
        },
        methods: {
            depositAction ()
            {
                this.$validator.validate().then(result =>
                {
                    if(result)
                    {
                        this.onWait = true;

                        this.$store.dispatch('deposit', {amount: this.deposit.amount, comment: this.deposit.comment})
                            .then((userData) =>
                            {
                                if(userData.hasOwnProperty('balance'))
                                {
                                    localStorage.setItem('user_data', JSON.stringify(userData));

                                    this.successMessage = 'Deposited Successfully!';
                                    this.success = true;
                                }
                                else
                                {
                                    this.errorMessage = 'Something went wrong!';
                                    this.failed = true;
                                }

                                this.deposit.amount = '';
                                this.deposit.comment = '';
                                this.onWait = false;

                                this.$validator.reset()
                            });

                        setTimeout(() => { this.failed = false; this.success = false; }, 2000)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>