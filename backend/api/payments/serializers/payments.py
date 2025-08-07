from rest_framework import serializers
from payments.models import PaymentOption, Deposit, Withdraw, Payment, Balance
from api.accounts.serializers.users import UserSerializer

class PaymentOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentOption
        fields = '__all__'

class DepositSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Deposit
        fields = '__all__'

class WithdrawSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Withdraw
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Payment
        fields = '__all__'

    def validate(self, data):
        if data['buyer'] == data['seller']:
            raise serializers.ValidationError("Buyer and Seller cannot be the same user.")
        
class DepositHistorySerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)
    payment_option = PaymentOptionSerializer(read_only=True)

    def get_type(self, obj):
        return 'deposit'

    class Meta:
        model = Deposit
        fields = '__all__'

class WithdrawHistorySerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    def get_type(self, obj):
        return 'withdraw'

    class Meta:
        model = Withdraw
        fields = '__all__'

class BalanceSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Balance
        fields = '__all__'