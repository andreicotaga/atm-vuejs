<template>
    <div class="withdraw">
        <h3>Withdraw</h3>
        <div class="withdraw__content">
            <b-form v-on:submit.prevent="withdrawAction()">
                <b-form-group id="amountGroup1"
                              label="Enter the amount you want to withdraw:"
                              label-for="amountWithdraw"
                >
                    <b-form-input id="amountWithdraw"
                                  name="Withdraw amount"
                                  type="number"
                                  v-model="withdraw.amount"
                                  v-validate="'required|decimal|min_value:1'"
                                  placeholder="e.g. 800.00">
                    </b-form-input>
                    <span>{{ errors.first('Withdraw amount') }}</span>
                </b-form-group>
                <b-form-group id="commentGroup1"
                              label="Comment:"
                              label-for="comment"
                >
                    <b-form-textarea id="comment"
                                     name="Comment"
                                     v-model="withdraw.comment"
                                     v-validate="'required|max:255'"
                                     :rows="3"
                                     :max-rows="6"
                                     placeholder="e.g. For personal use...">
                    </b-form-textarea>
                    <span>{{ errors.first('Comment') }}</span>
                    <span class="remote_error" v-if="failed">{{ errorMessage }}</span>
                    <span class="remote_success" v-if="success">{{ successMessage }}</span>
                </b-form-group>
                <b-button type="submit" variant="primary">Withdraw</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Withdraw',
        data () {
            return {
                withdraw: {
                    amount: '',
                    comment: ''
                },
                user: {},
                show: true,
                failed: false,
                success: false,
                errorMessage: ''
            }
        },
        methods: {
            withdrawAction ()
            {
                this.$validator.validate().then(result =>
                {
                    if(result)
                    {
                        this.$store.dispatch('withdraw', {amount: this.withdraw.amount, comment: this.withdraw.comment})
                            .then((response) =>
                            {
                                if(response.hasOwnProperty('balance'))
                                {
                                    localStorage.setItem('user_data', JSON.stringify(response));

                                    this.successMessage = 'Withdrawn Successfully!';
                                    this.success = true;
                                }
                                else
                                {
                                    this.errorMessage = response !== '' ? response : 'Something went wrong!';
                                    this.failed = true;
                                }

                                this.withdraw.amount = '';
                                this.withdraw.comment = '';

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