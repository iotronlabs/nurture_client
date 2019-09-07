<template>
	<div>

	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	created() {
		this.initialize()
	},
	methods: {
		async initialize() {
			const response = await this.$axios.post(`/api/attendence/show`,{
				centre: this.$auth.user.s_centre,
				class: this.$auth.user.s_class,
				s_id: this.$auth.user.s_id
			})
			console.log(response.data)
		}
	}
}
</script>
