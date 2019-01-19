<template>
    <div class="transfer">
        <h3>Transfer to an account</h3>
        <div class="transfer__content">
            <b-form v-on:submit.prevent="transferAction()">
                <b-form-group id="amountGroup1"
                              label="Enter the amount you want to transfer:"
                              label-for="amountTransfer"
                >
                    <b-form-input id="amountTransfer"
                                  name="Transfer amount"
                                  type="number"
                                  v-model="transfer.amount"
                                  v-validate="'required|decimal|min_value:1'"
                                  placeholder="e.g. 25.00">
                    </b-form-input>
                    <span>{{ errors.first('Transfer amount') }}</span>
                </b-form-group>
                <b-form-group id="cardNumberGroup1"
                              label="Card Number:"
                              label-for="cardNumber"
                >
                    <b-form-input id="cardNumber"
                                     name="card number"
                                     v-model="transfer.cardNumber"
                                     v-validate="'required|credit_card'"
                                     placeholder="e.g. 4869782615720997">
                    </b-form-input>
                    <span>{{ errors.first('card number') }}</span>
                    <span class="remote_error" v-if="failed">{{ errorMessage }}</span>
                    <span class="remote_success" v-if="success">{{ successMessage }}</span>
                </b-form-group>
                <b-button type="submit" variant="primary">Transfer</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Transfer",
        data () {
            return {
                transfer: {
                    amount: '',
                    cardNumber: ''
                },
                user: {},
                show: true,
                failed: false,
                success: false,
                errorMessage: ''
            }
        },
        methods: {
            transferAction ()
            {
                this.$validator.validate().then(result =>
                {
                    if(result)
                    {
                        this.$store.dispatch('transfer', {amount: this.transfer.amount, cardNumber: this.transfer.cardNumber})
                            .then((res) =>
                            {
                                if(res.hasOwnProperty('balance'))
                                {
                                    localStorage.setItem('user_data', JSON.stringify(res));

                                    this.successMessage = 'Transfered Successfully!';
                                    this.success = true;
                                }
                                else
                                {
                                    this.errorMessage = res !== '' ? res : 'Something went wrong!';
                                    this.failed = true;
                                }

                                this.transfer.amount = '';
                                this.transfer.cardNumber = '';

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