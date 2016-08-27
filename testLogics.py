import numpy

a = [[1,2,3, 4],[2, 4, 6, 8]]
b = [2, 2, 2, 2]

a = numpy.array(a)
b = numpy.array(b)

c=numpy.ndarray.tolist(a + b)
print c

print type(c)