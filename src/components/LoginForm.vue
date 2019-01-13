<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="inputCardDetailsGroup1"
                          label="Input your card number:"
                          label-for="cardNumber"
            >
                <b-form-input id="cardNumber"
                              type="text"
                              v-model="account.cardNumber"
                              required
                              placeholder="e.g. 1111 1111 1111 1111">
                </b-form-input>
            </b-form-group>
            <b-form-group id="inputCardDetailsGroup2"
                          label="Enter your pin:"
                          label-for="pin">
                <b-form-input id="pin"
                              type="number"
                              v-model="account.pin"
                              required
                              placeholder="e.g. 1234">
                </b-form-input>
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
                show: true
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                alert(JSON.stringify(this.account));
            },
            onReset (evt) {
                evt.preventDefault();

                this.account.pin = '';
                this.account.cardNumber = '';

                this.$nextTick(() => { this.show = true });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>