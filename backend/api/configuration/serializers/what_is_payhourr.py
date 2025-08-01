from rest_framework import serializers
from configuration.models import WhatIsPayhourr, WhatIsPayhourrItems

class WhatIsPayhourrItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatIsPayhourrItems
        fields = '__all__'

class WhatIsPayhourrSerializer(serializers.ModelSerializer):
    items = WhatIsPayhourrItemsSerializer(many=True, read_only=True)

    class Meta:
        model = WhatIsPayhourr
        fields = '__all__'
