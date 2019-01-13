<template>
    <div>
        <b-form v-on:submit.prevent="login()">
            <b-form-group id="inputCardDetailsGroup1"
                          label="Input your card number:"
                          label-for="cardNumber"
            >
                <b-form-input id="cardNumber"
                              name="card number"
                              type="text"
                              v-model="account.cardNumber"
                              v-validate="'required|credit_card'"
                              placeholder="e.g. 4869782615720997">
                </b-form-input>
                <span>{{ errors.first('card number') }}</span>
            </b-form-group>
            <b-form-group id="inputCardDetailsGroup2"
                          label="Enter your pin:"
                          label-for="pin">
                <b-form-input id="pin"
                              name="pin"
                              type="password"
                              v-model="account.pin"
                              v-validate="'required|min:4|max:4|numeric'"
                              placeholder="e.g. 1234">
                </b-form-input>
                <span>{{ errors.first('pin') }}</span>
                <span class="remote_error" v-if="failed">{{ errorMessage }}</span>
                <span class="remote_success" v-if="success">{{ successMessage }}</span>
            </b-form-group>
            <b-button type="submit" variant="primary">Enter</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                account: {
                    cardNumber: '',
                    pin: '',
                },
                show: true,
                failed: false,
                success: false,
                errorMessage: ''
            }
        },
        methods: {
            login ()
            {
                this.$validator.validate().then(result =>
                {
                    if(result)
                    {
                        let cardNumber  = this.account.cardNumber,
                            pin         = this.account.pin;

                        this.$store.dispatch('login', {cardNumber, pin})
                            .then((res) =>
                            {
                                if(res.hasOwnProperty('token'))
                                {
                                    this.successMessage = 'User is logged in! Redirecting...';
                                    this.success = true;

                                    this.$router.push('/account');
                                }
                                else
                                {
                                    this.errorMessage = this.$store.state.error;
                                    this.failed = true;
                                }
                            });

                        setTimeout(() => { this.failed = false; this.success = false; }, 2000)
                    }
                })
            }
        }
    }
</script>

<style lang="css" scoped>
    span
    {
        color: red;
        font-size: 12px;
    }

    .remote_success
    {
        color: green;
    }
</style>