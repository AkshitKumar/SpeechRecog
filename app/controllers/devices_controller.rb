class DevicesController < ApplicationController

	def turn_on
		@device = Device.find(params[:id])
		@device.update(state: 1)
		redirect_to root_url
	end

	def turn_off
		@device = Device.find(params[:id])
		@device.update(state: 0)
		redirect_to root_url
	end

end
