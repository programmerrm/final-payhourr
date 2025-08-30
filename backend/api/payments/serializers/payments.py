from rest_framework import serializers
from payments.models import Deposit, Withdraw, Payment
from api.accounts.serializers.users import UserSerializer

# DEPOSIT SERIALIZER
class DepositSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Deposit
        fields = '__all__'

# WITHDRAW SERIALIZER
class WithdrawSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Withdraw
        fields = '__all__'

# PAYMENT SERIALIZER
class PaymentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Payment
        fields = '__all__'

    def validate(self, data):
        if data['buyer'] == data['seller']:
            raise serializers.ValidationError("Buyer and Seller cannot be the same user.")

# DEPOSIT HISTORY SERIALIZER
class DepositHistorySerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    def get_type(self, obj):
        return 'deposit'

    class Meta:
        model = Deposit
        fields = '__all__'

# WITHDRAW HISTORY SERIALIZER
class WithdrawHistorySerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    def get_type(self, obj):
        return 'withdraw'

    class Meta:
        model = Withdraw
        fields = '__all__'
